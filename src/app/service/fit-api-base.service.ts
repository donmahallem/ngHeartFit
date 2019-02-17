
import { Injectable } from '@angular/core';
import { Observable, of, throwError, Observer } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FitDatasource } from './fit-datasource.modal';
import { map, flatMap, filter, shareReplay, single } from 'rxjs/operators';
import { ngGapiService, GapiStatus } from './nggapi-base.service';
import { GapiUserService } from './gapi-user.service';
import { GoogleApiService } from 'ng-gapi';

@Injectable()
export class FitApiBaseService {
    public static readonly ENDPOINT: string = 'https://www.googleapis.com/fitness/v1';
    private observable: Observable<void>;
    constructor(private httpService: HttpClient,
        private nggapi: ngGapiService,
        private gapiUser: GapiUserService,
        private googleApiService: GoogleApiService) {
        this.observable = this.googleApiService
            .onLoad()
            .pipe(flatMap(() => {
                return this.loadClient();
            }), shareReplay(1),
                single());

    }

    public loadClient(): Observable<void> {
        console.log("JJJJ");
        return Observable.create((observer: Observer<void>) => {
            const loadCfg: any = {
                callback: () => {
                    observer.next(null);
                    observer.complete();
                },
                onerror: (err: Error) => {
                    observer.error(err);
                }
            };
            gapi.load('client', loadCfg);
        });
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
        return this.observable
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
        return this.observable
            .pipe(flatMap(() => {
                return this.httpService.post<T>(url, body, {
                    headers: {
                        'Authorization': 'Bearer ' + this.gapiUser.getToken()
                    }, params: params
                });
            }));

    }

}