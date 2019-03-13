
import { Injectable } from '@angular/core';
import { Observable, of, throwError, Observer, from } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest, HttpResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { FitDatasource } from './fit-datasource.modal';
import { map, flatMap, filter, shareReplay, single } from 'rxjs/operators';
import { NgGapiService, GapiStatus } from './nggapi-base.service';
import { GapiUserService } from './gapi-user.service';
import { GoogleApiService } from 'ng-gapi';

@Injectable()
export class FitApiBaseService {
    public static readonly ENDPOINT: string = 'https://www.googleapis.com/fitness/v1';
    constructor(private httpService: HttpClient,
        private nggapi: NgGapiService,
        private gapiUser: GapiUserService) {

    }

    public base(): Observable<void> {
        return this.nggapi.statusObservable
            .pipe(filter((status) => {
                return status !== GapiStatus.LOADING;
            }), map((status: GapiStatus) => {
                if (status === GapiStatus.FAILED) {
                    throw new Error();
                }
                return;
            }));
    }

    public createGetRequest<T>(url: string, params: HttpParams | {
        [param: string]: string | string[];
    } = null): HttpRequest<T> {
        let paramObject: HttpParams = null;
        if (params) {
            paramObject = (params instanceof HttpParams) ? params : new HttpParams({
                fromObject: params
            });
        }
        return new HttpRequest<T>('GET', url, null, {
            responseType: 'json',
            headers: new HttpHeaders({
                'Authorization': 'Bearer ' + this.gapiUser.getToken()
            }),
            reportProgress: false,
            params: paramObject
        });
    }

    public executeBatchRequest<T extends { [req: string]: HttpRequest<any> }, RESPBODY extends { [K in keyof T]: HttpResponse<any> }>(requests: T): Observable<HttpResponse<RESPBODY>> {
        const request: HttpRequest<string> = this.createBatchRequest(requests);
        return this.httpService.request(request)
            .pipe(filter((resp: HttpEvent<string>): boolean => {
                return (resp.type === HttpEventType.Response);
            }), map((res: HttpEvent<string>): HttpResponse<any> => {
                return <any>this.parseBatchResponse(<HttpResponse<string>>res);
            }));
    }

    public createBatchRequest<REQBODY, T extends { [req: string]: HttpRequest<REQBODY> }, K extends keyof T>(requests: T): HttpRequest<string> {
        const boundary: string = 'batch' + new Date().valueOf();
        let body: string = '--' + boundary + '\n';
        let reqIdx = 0;
        for (const req in requests) {
            if (reqIdx > 0) {
                body += '\n';
            }
            const convertedBody: string = this.createBatchRequestBlock(req, requests[req]);
            body += convertedBody;
            body += '\n--' + boundary;
            reqIdx++;
        }
        body += '--';
        return new HttpRequest<string>('POST', 'https://www.googleapis.com/batch/fitness/v1', body, {
            headers: new HttpHeaders({
                'Content-Type': 'multipart/mixed; boundary=' + boundary,
                'Authorization': 'Bearer ' + this.gapiUser.getToken(),
                'Content-Length': '' + body.length
            }),
            responseType: 'text',
            reportProgress: false
        });
    }

    public getContentID(header: string): string {
        const reg: RegExp = /Content-ID: \S+/i;
        const res: RegExpMatchArray = header.match(reg);
        return res[0].substr('Content-ID: '.length);
    }

    public parseBatchResponse(response: HttpResponse<string>): HttpResponse<{ [key: string]: HttpResponse<any> }> {
        if (response.status !== 200) {
            return <any>response;
        }
        const boundaryMarker: string = response.headers.get('Content-Type').split('boundary=')[1];
        const splittedContent: string[] = response.body.split('--' + boundaryMarker);
        const parsedResponse: { [key: string]: HttpResponse<any> } = {};
        // const lineBreakRegex: RegExp = /[^\n{2,2}]+/gm;
        // skip first and last as those dont contain content
        for (let i = 1; i < splittedContent.length - 1; i++) {
            const content: string = splittedContent[i].trim();
            const lineBreakRegex: RegExp = /(\r\n|(\r|\n){2,2}){2,}[^(\r|\n)]/gm;
            const breakPoints: number[] = [];
            let regArray: RegExpExecArray;
            while ((regArray = lineBreakRegex.exec(content)) !== null) {
                breakPoints.push(regArray.index);
            }
            const firstHeader: string = content.substr(0, breakPoints[0]).trim();
            const secondHeader: string = content.substr(breakPoints[0], breakPoints[1] - breakPoints[0]).trim();
            const responseBody: string = content.substr(breakPoints[1]).trim();
            const contentId: string = this.getContentID(firstHeader);

            const statusLineEndIdx: number = secondHeader.search(/(\r|\n)/);
            const statusLine: string = secondHeader.substr(0, statusLineEndIdx);
            const statusLineSplits: string[] = statusLine.split(' ', 3);
            const headers: HttpHeaders = new HttpHeaders(secondHeader.substr(statusLineEndIdx));
            parsedResponse[contentId] = new HttpResponse({
                body: JSON.parse(responseBody),
                headers: headers,
                status: parseInt(statusLineSplits[1], 10),
                statusText: statusLineSplits[2].trim()
            });
        }
        return response.clone({ body: parsedResponse });
    }


    public createBatchRequestBlock<REQUEST_BODY_TYPE>(id: string, request: HttpRequest<REQUEST_BODY_TYPE>) {
        let body = '';
        body += 'Content-Type: application/http\n';
        body += 'Content-Transfer-Encoding: binary\n';
        body += 'Content-ID: ' + id + '\n';
        let innerBody: string = request.method.toUpperCase() + ' ' + request.urlWithParams + '\n';
        if (request.method === 'post' || request.method === 'put' || request.method === 'patch') {
            innerBody += 'Content-Type: application/json; charset=UTF-8\n';
        }
        innerBody += 'Authorization: Bearer ' + this.gapiUser.getToken() + '\n';
        if (request.body) {
            const convertedBody: string = request.serializeBody().toString();
            // innerBody += 'Content-Length: ' + convertedBody.length + '\n';
            innerBody += '\n';
            innerBody += convertedBody;
        }
        // body += 'Content-Length: ' + innerBody.length+'\n';
        body += '\n' + innerBody;
        return body;
    }

    public getRequest<RESP_BODY>(url: string, params: HttpParams | {
        [param: string]: string | string[];
    } = null): Observable<HttpEvent<RESP_BODY>> {
        return this.base()
            .pipe(flatMap((): Observable<HttpEvent<RESP_BODY>> => {
                let convertedParams: HttpParams = null;
                if (params) {
                    if (params instanceof HttpParams) {
                        convertedParams = params;
                    } else {
                        convertedParams = new HttpParams({
                            fromObject: params
                        });
                    }
                }
                const request = new HttpRequest('GET', url, {
                    headers: new HttpHeaders({
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + this.gapiUser.getToken(),
                    }),
                    responseType: 'json',
                    reportProgress: false,
                    params: convertedParams
                });
                return this.request(request);
            }));
    }

    public postRequest<REQ_BODY, RESP_BODY>(url: string, body: REQ_BODY, params: HttpParams | {
        [param: string]: string | string[];
    } = null): Observable<HttpEvent<RESP_BODY>> {
        return this.base()
            .pipe(flatMap((): Observable<HttpEvent<RESP_BODY>> => {
                const request = new HttpRequest<REQ_BODY>('POST', url, body, {
                    headers: new HttpHeaders({
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + this.gapiUser.getToken(),
                    }),
                    responseType: 'json',
                    reportProgress: false
                });
                return this.request(request);
            }));
    }

    public request<REQ_BODY, RESP_BODY>(req: HttpRequest<REQ_BODY>): Observable<HttpEvent<RESP_BODY>> {
        return this.httpService.request(req);
    }
}

export interface PostBatchRequest extends BatchRequest {
    body: any;
}

export interface BatchRequest {
    content_id: string;
    method: 'get' | 'post' | 'put' | 'patch';
    path: string;
}

export class ApiRequest<T> {
    private mClient: HttpClient;
    private mRequest: HttpRequest<T>;
    constructor(client: HttpClient, request: HttpRequest<T>) {
        this.mClient = client;
        this.mRequest = request;
    }

    public get request(): HttpRequest<T> {
        return this.mRequest;
    }

    public execute(): Observable<HttpResponse<T>> {
        return <Observable<HttpResponse<T>>>this.mClient.request(this.mRequest);
    }
}
