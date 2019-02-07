import { Injectable } from '@angular/core';
import {
    CanActivate,
    Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    CanActivateChild
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { GapiUserService } from './gapi-user.service';
import { tap, single, catchError } from 'rxjs/operators';

@Injectable()
export class RouteGuardService implements CanActivate, CanActivateChild {

    constructor(private gapiUserService: GapiUserService, private router: Router) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        if (!route.data["requiresLogin"]) {
            return true;
        } else if (this.gapiUserService.isSignedIn === true) {
            return true;
        }
        return this.gapiUserService
            .isSignedInObservable
            .pipe(catchError((err: any): Observable<boolean> => {
                return of(false)
            }), single(), tap((signedIn) => {
                if (!signedIn) {
                    this.router.navigate(['google', 'login']);
                }
                console.log("TBABAB", signedIn);
            }))
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        return this.canActivate(route, state);
    }
}