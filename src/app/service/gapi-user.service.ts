import { GoogleAuthService } from "ng-gapi";
import { Injectable } from "@angular/core";
import {
    timer,
    Observable,
    Subscription,
    of,
    combineLatest,
    BehaviorSubject
} from "rxjs";
import {
    catchError,
    map,
    tap,
    mergeMapTo,
    filter,
    mergeMap,
    single
} from 'rxjs/operators';
export enum ClientStatus {
    LOADING = 1,
    LOADED = 2,
    ERROR = 3
}
@Injectable({
    providedIn: 'root'
})
export class GapiUserService {
    public static SESSION_STORAGE_KEY: string = 'accessToken';
    private user: gapi.auth2.GoogleUser;
    private signinStatusSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
    private clientStatusSubject: BehaviorSubject<ClientStatus> = new BehaviorSubject(ClientStatus.LOADING);

    constructor(private googleAuthService: GoogleAuthService) {
    }

    public getToken(): string {
        let token: string = sessionStorage.getItem(GapiUserService.SESSION_STORAGE_KEY);
        if (!token) {
            throw new Error("no token set , authentication required");
        }
        return sessionStorage.getItem(GapiUserService.SESSION_STORAGE_KEY);
    }

    public getUserObservable(): Observable<gapi.auth2.GoogleUser> {
        return this.googleAuthService.getAuth()
            .pipe(map((auth: gapi.auth2.GoogleAuth) => {
                if (auth.isSignedIn.get()) {
                    return auth.currentUser.get();
                } else {
                    throw new Error("not signed in");
                }
            }));
    }

    public isSignedInObservable(): Observable<boolean> {
        return this.googleAuthService
            .getAuth()
            .pipe(map((value: gapi.auth2.GoogleAuth) => {
                return value.isSignedIn.get();
            }), single());
    }

    public signIn(): void {
        this.googleAuthService.getAuth()
            .subscribe((auth) => {
                auth.signIn().then(res => this.signInSuccessHandler(res));
            });
    }

    private signInSuccessHandler(res: gapi.auth2.GoogleUser) {
        this.user = res;
        sessionStorage.setItem(
            GapiUserService.SESSION_STORAGE_KEY, res.getAuthResponse().access_token
        );
    }
}