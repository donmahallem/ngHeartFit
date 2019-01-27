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
    single,
    flatMap
} from 'rxjs/operators';
import {
    oauth2_v2
} from 'googleapis';
import {
    Credentials, OAuth2Client, GenerateAuthUrlOpts
} from 'google-auth-library';
import {

} from 'googleapis';
import { environment } from "src/environments/environment.prod";
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
    private mOAuth2Client: OAuth2Client;

    constructor() {

        this.mOAuth2Client = new OAuth2Client(environment.gapi.client_id,
            environment.gapi.client_secret,
            environment.gapi.redirect_uri
        );
    }

    public getToken2(): Observable<string> {
        return of("JJ");
    }

    public getToken(): string {
        let token: string = sessionStorage.getItem(GapiUserService.SESSION_STORAGE_KEY);
        if (!token) {
            throw new Error("no token set , authentication required");
        }
        return sessionStorage.getItem(GapiUserService.SESSION_STORAGE_KEY);
    }

    public getUserObservable(): Observable<oauth2_v2.Schema$Userinfoplus> {
        const a: oauth2_v2.Oauth2 = new oauth2_v2.Oauth2({
            auth: ""
        });
        return of(null);
    }

    public isSignedInObservable(): Observable<boolean> {
        return of(false);
    }

    public signIn(): void {
        const options: GenerateAuthUrlOpts = {
            access_type: 'offline',
            scope: [
                'https://www.googleapis.com/auth/fitness.body.read',
                'https://www.googleapis.com/auth/fitness.body.write'
            ],
            include_granted_scopes: true,
            redirect_uri: environment.gapi.redirect_uri
            //code_challenge: this.createCodeChallenge(this.createCodeVerifier()),
            //code_challenge_method: CodeChallengeMethod.S256
        };
        this.mOAuth2Client.generateAuthUrl(options);
    }

    private signInSuccessHandler(res: gapi.auth2.GoogleUser) {
        this.user = res;
        sessionStorage.setItem(
            GapiUserService.SESSION_STORAGE_KEY, res.getAuthResponse().access_token
        );
    }
}