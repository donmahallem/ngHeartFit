/*!
 * Source https://github.com/donmahallem/ngHeartFit
 */

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, throwError, Observable } from 'rxjs';
import { delay, flatMap, retryWhen } from 'rxjs/operators';

export interface ISignInUrlResponse {
    url: string;
}

export interface IExchangeCodeResponse {
    url: string;
}
// tslint:disable-next-line:no-empty-interface
export interface IUser {

}

@Injectable({
    providedIn: 'root',
})
export class GapiAuthService {
    a = 0;

    constructor(private http: HttpClient) {
    }

    public getMe(): Observable<IUser> {
        return this.http
            .get<IUser>('/api/google/user/me');
    }

    public getSigninUrl(): Observable<ISignInUrlResponse> {
        return this.http
            .get<ISignInUrlResponse>('/api/google/auth/url');
    }

    public exchangeCode(code: string): Observable<IExchangeCodeResponse> {
        const body: any = {
            code,
        };
        return this.http.post<IExchangeCodeResponse>('/api/google/auth/code', body);
    }
    public refreshToken(): Observable<boolean> {
        this.a++;
        if (this.a % 3 === 0) {
            return throwError(new Error('asdf'));
        } else {
            return of(true);
        }
    }
    public authRequest<T>(obs: Observable<T>): Observable<T> {
        return obs
            .pipe(retryWhen((errors: Observable<any | HttpErrorResponse>) => {
                let retries = 0;
                return errors.pipe(flatMap((err: any | HttpErrorResponse) => {
                    if (err.status) {
                        if (err.status === 401) {
                            return this.refreshToken();
                        } else {
                            throw err;
                        }
                    }
                    if (retries < 3) {
                        retries++;
                        return delay(1000 * retries);
                    } else {
                        throw err;
                    }
                }));
            }));
    }
}
