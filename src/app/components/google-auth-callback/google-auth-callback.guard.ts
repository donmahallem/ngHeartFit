/*!
 * Source https://github.com/donmahallem/ngHeartFit
 */

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { of, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { GapiAuthService } from 'src/app/service/gapi-auth.service';
import { IExchangeCodeResponse, ISignInUrlResponse } from 'src/app/service/gapi.service';

@Injectable({
    providedIn: 'root',
})
export class GoogleAuthCallbackGuard implements CanActivate, CanActivateChild, Resolve<string>  {
    public static readonly SIGNIN_URL: string = 'signin_url';
    constructor(private authService: GapiAuthService, private router: Router) { }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        const url: string = state.url;

        return this.authService
            .exchangeCode(route.queryParams.code)
            .pipe(map((val: IExchangeCodeResponse): boolean => {
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
            .pipe(map((response: ISignInUrlResponse) =>
                response.url), catchError((err: any): Observable<string> =>
                    of()));
    }
}
