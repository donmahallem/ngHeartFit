/*!
 * Source https://github.com/donmahallem/ngHeartFit
 */

import { Injectable } from '@angular/core';
import { GoogleAuthService } from 'ng-gapi';
import { of, BehaviorSubject, Observable, Observer } from 'rxjs';
import { catchError, flatMap, shareReplay, tap } from 'rxjs/operators';

@Injectable()
export class GapiUserService {

    public get isSignedIn(): boolean {
        const inst: gapi.auth2.GoogleAuth = (this.googleAuth as any).GoogleAuth;
        if (inst) {
            return inst.isSignedIn.get();
        }
        return false;
    }

    public get user(): gapi.auth2.GoogleUser {
        return this.mUserSubject.value;
    }
    public get isSignedInObservable(): Observable<boolean> {
        return this.signedInObservable;
    }
    public static SESSION_STORAGE_KEY = 'accessToken';
    private mUserSubject: BehaviorSubject<gapi.auth2.GoogleUser> = new BehaviorSubject(undefined);
    private signedInObservable: Observable<boolean>;
    constructor(private googleAuth: GoogleAuthService) {
        this.watchUserChanges();
        this.signedInObservable = this.createSignedInObservable();
    }

    public get userObservable(): Observable<gapi.auth2.GoogleUser> {
        return this.mUserSubject.asObservable();
    }

    public createSignedInObservable(): Observable<boolean> {
        return this.googleAuth
            .getAuth()
            .pipe(flatMap((googleAuthClient: gapi.auth2.GoogleAuth): Observable<boolean> =>
                new Observable((observer: Observer<boolean>) => {
                    observer.next(googleAuthClient.isSignedIn.get());
                    googleAuthClient.isSignedIn.listen((signedIn: boolean) => {
                        observer.next(signedIn);
                    });
                })), catchError((err): Observable<boolean> =>
                    of(false)), shareReplay(1));

    }
    public watchUserChanges(): void {
        this.googleAuth
            .getAuth()
            .pipe(flatMap((googleAuthClient: gapi.auth2.GoogleAuth): Observable<string> =>
                new Observable((observer: Observer<string>) => {
                    if (googleAuthClient.currentUser.get()) {
                        observer.next(googleAuthClient.currentUser.get().getAuthResponse().access_token);
                    }
                    googleAuthClient.currentUser.listen((user) => {
                        observer.next(user.getAuthResponse().access_token);
                    });
                })))
            .subscribe((token: string) => {
                this.setAccessToken(token);
            });
    }
    public getToken(): string {
        const token: string = sessionStorage.getItem(GapiUserService.SESSION_STORAGE_KEY);
        if (!token) {
            throw new Error('no token set , authentication required');
        }
        return sessionStorage.getItem(GapiUserService.SESSION_STORAGE_KEY);
    }

    public signIn(): Observable<gapi.auth2.GoogleUser> {
        return this.googleAuth.getAuth()
            .pipe(flatMap((auth: gapi.auth2.GoogleAuth) =>
                auth.signIn()), tap((user: gapi.auth2.GoogleUser) => {
                    this.signInSuccessHandler(user);
                }));
    }

    private setAccessToken(token: string) {
        sessionStorage.setItem(
            GapiUserService.SESSION_STORAGE_KEY, token,
        );
    }
    private signInSuccessHandler(res: gapi.auth2.GoogleUser) {
        this.mUserSubject.next(res);
        sessionStorage.setItem(
            GapiUserService.SESSION_STORAGE_KEY, res.getAuthResponse().access_token,
        );
    }
}
