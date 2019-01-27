import { Injectable, NgZone } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { timer, Observable, Subscription, of, combineLatest, BehaviorSubject } from "rxjs";
import { catchError, map, tap, mergeMapTo, filter, mergeMap } from 'rxjs/operators';
import * as moment from 'moment';

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
export class GapiAuthService {

    constructor(private http: HttpClient) {
    }

    public getMe(): Observable<User> {
        return this.http
            .get<User>("/api/google/user/me");
    }

    public getSigninUrl(): Observable<SignInUrlResponse> {
        return this.http
            .get<SignInUrlResponse>("/api/google/auth/url");
    }

    public exchangeCode(code: string): Observable<ExchangeCodeResponse> {
        const body: any = {
            code: code
        };
        return this.http.post<ExchangeCodeResponse>("/api/google/auth/code", body);
    }
}