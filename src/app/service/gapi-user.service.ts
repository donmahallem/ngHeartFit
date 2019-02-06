import { Injectable } from "@angular/core";
import { GoogleAuthService } from "ng-gapi";
import { ngGapiService } from "./nggapi-base.service";
import { Observable, Observer } from "rxjs";
import { flatMap } from "rxjs/operators";

@Injectable()
export class GapiUserService {
    public static SESSION_STORAGE_KEY: string = 'accessToken';
    private user: gapi.auth2.GoogleUser;

    constructor(private googleAuth: GoogleAuthService) {
    }

    public getToken(): string {
        let token: string = sessionStorage.getItem(GapiUserService.SESSION_STORAGE_KEY);
        if (!token) {
            throw new Error("no token set , authentication required");
        }
        return sessionStorage.getItem(GapiUserService.SESSION_STORAGE_KEY);
    }

    public signIn(): void {
        this.googleAuth.getAuth()
            .subscribe((auth) => {
                auth.signIn().then(res => this.signInSuccessHandler(res));
            });
    }

    public get isSignedIn(): boolean {
        const inst: gapi.auth2.GoogleAuth = (<any>this.googleAuth).GoogleAuth;
        if (inst) {
            return inst.isSignedIn.get();
        }
        return false;
    }

    public get isSignedInObservable(): Observable<boolean> {
        return this.googleAuth.getAuth()
            .pipe(flatMap((val: gapi.auth2.GoogleAuth): Observable<boolean> => {
                return Observable.create((observer: Observer<boolean>) => {
                    val.isSignedIn.listen((signedin: boolean) => {
                        observer.next(signedin);
                    });
                });
            }));
    }

    private signInSuccessHandler(res: gapi.auth2.GoogleUser) {
        this.user = res;
        sessionStorage.setItem(
            GapiUserService.SESSION_STORAGE_KEY, res.getAuthResponse().access_token
        );
    }
}