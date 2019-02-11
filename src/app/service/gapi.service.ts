import { Injectable, NgZone } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { timer, Observable, Subscription, of, combineLatest, BehaviorSubject } from 'rxjs';
import { catchError, map, tap, mergeMapTo, filter, mergeMap, retryWhen, flatMap } from 'rxjs/operators';
import * as moment from 'moment';
import { GapiAuthService } from './gapi-auth.service';

export interface SignInUrlResponse {
    url: string;
}

export interface ExchangeCodeResponse {

}
export interface User {

}

export interface SubmitBodyMetricsRequest {
    timestamp: number;
    bodyweight?: number;
    bodyfat?: number;
    bodyheight?: number;
}
@Injectable({
    providedIn: 'root',
})
export class GapiService {

    constructor(private http: HttpClient, private gapiAuth: GapiAuthService) {
    }

    public getMe(): Observable<User> {
        return this.http
            .get<User>('/api/google/user/me');
    }

    public getDataSources(): Observable<any> {
        return this.gapiAuth.authRequest(this.http.get<any>('/api/google/fit/datasources'));
    }

    public submitBodyMetrics(data: SubmitBodyMetricsRequest): Observable<any> {
        return this.gapiAuth.authRequest(this.http.post<any>('/api/google/fit/bodymetrics', data));
    }

    /**
     *
     * @param from unix timestamp in seconds since epoch
     * @param to unix timestamp in seconds since epoch
     */
    public getWeight(from: moment.Moment, to: moment.Moment): Observable<any> {
        const reqParams: HttpParams = new HttpParams();
        reqParams.set('from', from.unix().toString());
        reqParams.set('to', to.unix().toString());
        return this.gapiAuth.authRequest(this.http.get<any>('/api/google/fit/weight', {
            params: reqParams
        }));
    }
    /**
     *
     * @param from unix timestamp in seconds since epoch
     * @param to unix timestamp in seconds since epoch
     * @param bucketsize in seconds
     */
    public getWeightBucket(from: moment.Moment, to: moment.Moment, bucketsize: number): Observable<any> {
        const reqParams: HttpParams = new HttpParams();
        reqParams.set('from', from.unix().toString());
        reqParams.set('to', to.unix().toString());
        reqParams.set('bucketsize', bucketsize.toString());
        return this.gapiAuth.authRequest(this.http.get<any>('/api/google/fit/weight', {
            params: reqParams
        }));
    }
}
