import { Injectable, NgZone } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { timer, Observable, Subscription, of, combineLatest, BehaviorSubject } from "rxjs";
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

@Injectable({
    providedIn: 'root',
})
export class GapiService {

    constructor(private http: HttpClient, private gapiAuth: GapiAuthService) {
    }

    public getMe(): Observable<User> {
        return this.http
            .get<User>("/api/google/user/me");
    }

    public getDataSources(): Observable<any> {
        return this.gapiAuth.authRequest(this.http.get<any>("/api/google/fit/datasources"));
    }

}