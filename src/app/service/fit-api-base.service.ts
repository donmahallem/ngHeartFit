
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FitDatasource } from './fit-datasource.modal';
import { map, flatMap, filter } from 'rxjs/operators';
import { ngGapiService, GapiStatus } from './nggapi-base.service';
import { GapiUserService } from './gapi-user.service';

@Injectable()
export class FitApiBaseService {
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


    public getRequest<T>(url: string, params: HttpParams | {
        [param: string]: string | string[];
    } = null): Observable<T> {
        return this.base()
            .pipe(flatMap(() => {
                return this.httpService.get<T>(url, {
                    headers: {
                        'Authorization': 'Bearer ' + this.gapiUser.getToken()
                    }, params: params
                });
            }));
    }

    public postRequest<T>(url: string, body: any, params: HttpParams | {
        [param: string]: string | string[];
    } = null): Observable<T> {
        return this.base()
            .pipe(flatMap(() => {
                return this.httpService.post<T>(url, body, {
                    headers: {
                        'Authorization': 'Bearer ' + this.gapiUser.getToken()
                    }, params: params
                });
            }));

    }

}