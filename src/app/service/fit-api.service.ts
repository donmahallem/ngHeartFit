
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, flatMap, filter } from 'rxjs/operators';
import { SubmitValue, SubmitToDatasetBody, SubmitToDatasetResponse, BucketResponse, ListSessionsResponse, FitSession, Bucket } from './fit-api-modals';
import { ngGapiService, GapiStatus } from './nggapi-base.service';
import { GapiUserService } from './gapi-user.service';
import * as moment from 'moment';

@Injectable()
export class FitApiService {
    public static readonly ENDPOINT: string = 'https://www.googleapis.com/fitness/v1';
    constructor(private httpService: HttpClient,
        private nggapi: ngGapiService,
        private gapiUser: GapiUserService) {

    }

    public base(): Observable<void> {
        return this.nggapi.statusObservable
            .pipe(filter((status) => {
                return status != GapiStatus.LOADING;
            }), map((status: GapiStatus) => {
                if (status === GapiStatus.FAILED) {
                    throw new Error();
                }
                return;
            }));
    }

    public getSession(id: string): Observable<FitSession> {
        return this.base()
            .pipe(flatMap((t: void) => {
                const url = FitApiService.ENDPOINT + '/users/me/sessions/' + id;
                return this.httpService.get<FitSession>(url, {
                    headers: {
                        'Authorization': 'Bearer ' + this.gapiUser.getToken()
                    }
                });
            }));
    }

    public getSessions(startTime?: moment.Moment, endTime?: moment.Moment): Observable<ListSessionsResponse> {
        return this.base()
            .pipe(flatMap((t: void) => {
                const url = FitApiService.ENDPOINT + '/users/me/sessions';
                const headers: HttpHeaders = new HttpHeaders();
                const params: HttpParams | {
                    [param: string]: string | string[];
                } = {};
                if (startTime) {
                    params['startTime'] = startTime.utc().format('YYYY-MM-DDTHH:mm:ss.SSS') + 'Z';
                }
                if (endTime) {
                    params['endTime'] = endTime.utc().format('YYYY-MM-DDTHH:mm:ss.SSS') + 'Z';
                }
                return this.httpService.get<ListSessionsResponse>(url, {
                    headers: {
                        'Authorization': 'Bearer ' + this.gapiUser.getToken()
                    },
                    params
                });
            }));
    }
    public getMergedWeights(): Observable<any> {
        return this.base()
            .pipe(flatMap(() => {
                const dataSourceId = 'derived:com.google.weight:com.google.android.gms:merge_weight';
                const nanoTimestamp: string = moment.utc().subtract(100, 'days').unix() + '000000000'; 1397515179728708316;
                const nanoTimestamp2: string = moment.utc().unix() + '000000000';
                const url = FitApiService.ENDPOINT + '/users/me/dataSources/' + dataSourceId + '/datasets/' + nanoTimestamp + '-' + nanoTimestamp2;
                const headers: HttpHeaders = new HttpHeaders();
                console.log(headers);
                return this.httpService.get(url, {
                    headers: {
                        'Authorization': 'Bearer ' + this.gapiUser.getToken()
                    }
                });
            }));
    }

    public createDataSourceMetaData(dataType: DataType, dataStreamName?: string): CreateDataSourceRequest {
        return {
            'dataStreamName': dataStreamName,
            'type': 'raw',
            'application': {
                'detailsUrl': 'https://donmahallem.github.io/ngHeartFit',
                'name': 'HeartFit',
                'version': '1'
            },
            'dataType': dataType,
            'device': {
                'manufacturer': navigator.appCodeName,
                'model': navigator.appName,
                'type': 'unknown',
                'uid': navigator.userAgent,
                'version': navigator.appVersion
            }
        };
    }

    public createWeightDatasource(): Observable<any> {
        return this.createDataSource(this.createDataSourceMetaData({
            'field': [
                {
                    'name': 'weight',
                    'format': 'floatPoint'
                }
            ],
            'name': 'com.google.weight'
        }, 'HeartFitWeightUserInput'));
    }

    public createBodyFatPercentageDatasource(): Observable<any> {
        return this.createDataSource(this.createDataSourceMetaData({
            'field': [
                {
                    'name': 'percentage',
                    'format': 'floatPoint'
                }
            ],
            'name': 'com.google.body.fat.percentage'
        }, 'HeartFitBodyFatPercentageUserInput'));
    }

    public createDataSource(datasource: CreateDataSourceRequest): Observable<any> {
        return this.base()
            .pipe(flatMap(() => {
                return this.postRequest(FitApiService.ENDPOINT + '/users/me/dataSources', datasource);
            }));
    }

    public getAggregateData(source: AggregateByFilter[], from: moment.Moment, to: moment.Moment, bucketWindowMillis: number): Observable<BucketResponse> {
        return this.base()
            .pipe(flatMap((): Observable<BucketResponse> => {
                const requestBody: any = {
                    'startTimeMillis': from.utc().valueOf(),
                    'endTimeMillis': to.utc().valueOf(),
                    'aggregateBy': source,
                    'bucketByTime': {
                        'durationMillis': bucketWindowMillis
                    }
                };
                const url = FitApiService.ENDPOINT + '/users/me/dataset:aggregate';
                return this.postRequest<BucketResponse>(url, requestBody);
            }));
    }

    public getRequest<T>(url: string, body: any, params: HttpParams | {
        [param: string]: string | string[];
    } = null): Observable<T> {
        return this.httpService.post<T>(url, body, {
            headers: {
                'Authorization': 'Bearer ' + this.gapiUser.getToken()
            }, params: params
        });
    }

    public postRequest<T>(url: string, body: any, params: HttpParams | {
        [param: string]: string | string[];
    } = null): Observable<T> {
        return this.httpService.post<T>(url, body, {
            headers: {
                'Authorization': 'Bearer ' + this.gapiUser.getToken()
            }, params: params
        });
    }

    public insertDataPoints(a?: any[]) {
        return null;
    }
    public insertWeightDataPoints(sourceId: string, dataPoints: { weight: number, timestamp: moment.Moment }[]): Observable<SubmitToDatasetResponse> {
        return this.base()
            .pipe(flatMap(() => {
                let startTimeMillis: any = -1;
                let endTimeMillis: any = -1;
                const submitPoints: SubmitValue[] = [];
                for (const dpoint of dataPoints) {
                    if (startTimeMillis < 0 || startTimeMillis > dpoint.timestamp.valueOf()) {
                        startTimeMillis = dpoint.timestamp.valueOf();
                    }
                    if (endTimeMillis < 0 || endTimeMillis < dpoint.timestamp.valueOf()) {
                        endTimeMillis = dpoint.timestamp.valueOf();
                    }
                    if (dpoint.weight) {
                        submitPoints.push(
                            {
                                'dataTypeName': 'com.google.weight',
                                'endTimeNanos': dpoint.timestamp.valueOf() * 1000000,
                                'originDataSourceId': sourceId,
                                'startTimeNanos': dpoint.timestamp.valueOf() * 1000000,
                                'value': [
                                    {
                                        'fpVal': dpoint.weight
                                    }
                                ]
                            });
                    }
                }
                const requestBody: SubmitToDatasetBody = {
                    'dataSourceId': sourceId,
                    'maxEndTimeNs': endTimeMillis * 1000000,
                    'minStartTimeNs': startTimeMillis * 1000000,
                    'point': submitPoints
                };

                return this.httpService.patch(FitApiService.ENDPOINT + '/users/me/dataSources/' + sourceId + '/datasets/' + requestBody.minStartTimeNs + '-' + requestBody.maxEndTimeNs, requestBody, {
                    headers: {
                        'Authorization': 'Bearer ' + this.gapiUser.getToken()
                    }
                });
            }), map((value: Object) => {
                return <SubmitToDatasetResponse>value;
            }));
    }
    public insertFatDataPoints(sourceId: string, dataPoints: { fat: number, timestamp: moment.Moment }[]): Observable<SubmitToDatasetResponse> {
        return this.base()
            .pipe(flatMap(() => {
                let startTimeMillis: any = -1;
                let endTimeMillis: any = -1;
                const submitPoints: SubmitValue[] = [];
                for (const dpoint of dataPoints) {
                    if (startTimeMillis < 0 || startTimeMillis > dpoint.timestamp.valueOf()) {
                        startTimeMillis = dpoint.timestamp.valueOf();
                    }
                    if (endTimeMillis < 0 || endTimeMillis < dpoint.timestamp.valueOf()) {
                        endTimeMillis = dpoint.timestamp.valueOf();
                    }
                    if (dpoint.fat) {
                        submitPoints.push(
                            {
                                'dataTypeName': 'com.google.body.fat.percentage',
                                'endTimeNanos': dpoint.timestamp.valueOf() * 1000000,
                                'originDataSourceId': sourceId,
                                'startTimeNanos': dpoint.timestamp.valueOf() * 1000000,
                                'value': [
                                    {
                                        'fpVal': dpoint.fat
                                    }
                                ]
                            });
                    }
                }
                const requestBody: SubmitToDatasetBody = {
                    'dataSourceId': sourceId,
                    'maxEndTimeNs': endTimeMillis * 1000000,
                    'minStartTimeNs': startTimeMillis * 1000000,
                    'point': submitPoints
                };

                return this.httpService.patch(FitApiService.ENDPOINT + '/users/me/dataSources/' + sourceId + '/datasets/' + requestBody.minStartTimeNs + '-' + requestBody.maxEndTimeNs, requestBody, {
                    headers: {
                        'Authorization': 'Bearer ' + this.gapiUser.getToken()
                    }
                });
            }), map((value: Object) => {
                return <SubmitToDatasetResponse>value;
            }));
    }

    public submitBodyMetrics(metrics: SubmitBodyMetricsRequest): Observable<any> {
        this.nggapi
            .loadClient
            .subscribe(() => {
                // @ts-ignore: Property 'newBatch' does not exist on type 'typeof client'.
                const myBatch: gapi.client.HttpBatch = gapi.client.newBatch();
                // const myBatch: gapi.client.HttpBatch = new gapi.client.HttpBatch();
                const req1: gapi.client.HttpRequest<any> = gapi.client.request({
                    path: FitApiService.ENDPOINT + '/users/me/dataSources/',
                    params: {
                        'dataTypeName': 'com.google.weight'
                    }
                });
                const req2: gapi.client.HttpRequest<any> = gapi.client.request({
                    path: FitApiService.ENDPOINT + '/users/me/dataSources/',
                    params: {
                        'dataTypeName': 'com.google.body.fat.percentage'
                    }
                });
                myBatch.add(req1);
                myBatch.add(req2);
                myBatch.execute(console.log);
            });
        return null;
    }

}
export interface SubmitBodyMetricsRequest {
    timestamp: number;
    bodyweight?: number;
    bodyheight?: number;
    bodyfat?: number;
}

export interface Tasklist {
    id?: string;
}

export interface AggregateByFilter {
    dataTypeName?: string;
    dataSourceId?: string;
}

export interface DataType {
    'name': string;
    'field': {
        'name': string;
        'format': 'blob' | 'floatList' | 'floatPoint' | 'integer' | 'integerList' | 'map' | 'string';
        'optional'?: boolean;
    }[];
}
export interface CreateDataSourceRequest {
    'dataStreamName'?: string;
    'type': 'raw' | 'derived';
    'application'?: {
        'detailsUrl': string;
        'name': string;
        'version': string;
    };
    'dataType': DataType;
    'device': {
        'manufacturer': string;
        'model': string;
        'type': 'chestStrap' | 'headMounted' | 'phone' | 'scale' | 'tablet' | 'unknown' | 'watch';
        'uid': string;
        'version': string;
    };
}
