import { Injectable } from "@angular/core";
import { CanActivateChild, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Resolve } from "@angular/router";
import { GapiAuthService } from "src/app/service/gapi-auth.service";
import { Observable, of, EMPTY } from 'rxjs';
import { map, catchError } from "rxjs/operators";
import { ExchangeCodeResponse, SignInUrlResponse } from "src/app/service/gapi.service";

@Injectable({
    providedIn: 'root',
})
export class GoogleAuthCallbackGuard implements CanActivate, CanActivateChild, Resolve<string>  {
    public static readonly SIGNIN_URL: string = "signin_url";
    constructor(private authService: GapiAuthService, private router: Router) { }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        let url: string = state.url;

        return this.authService
            .exchangeCode(route.queryParams['code'])
            .pipe(map((val: ExchangeCodeResponse): boolean => {
                this.router.navigate(['']);
                return false;
            }), catchError((err: any): Observable<boolean> => {
                this.router.navigate(['login', 'google']);
                return of(false);
            }));
    }

    public canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.canActivate(route, state);
    }

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<string> {
        return this.authService
            .getSigninUrl()
            .pipe(map((response: SignInUrlResponse) => {
                return response.url;
            }), catchError((err: any): Observable<string> => {
                return of();
            }));
    }
}