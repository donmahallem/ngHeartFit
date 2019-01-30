import { Injectable, NgZone } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { timer, Observable, Subscription, of, combineLatest, BehaviorSubject, throwError } from "rxjs";
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
    a:number=0;
    public refreshToken():Observable<boolean>{
        this.a++;
        if(this.a%3==0){
            return throwError(new Error("asdf"));
        }else{
            return of(true);
        }
    }
}