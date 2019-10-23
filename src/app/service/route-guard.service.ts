import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    CanActivateChild,
    Router,
    RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { GapiUserService } from './gapi-user.service';

@Injectable()
export class RouteGuardService implements CanActivate, CanActivateChild {

    constructor(private gapiUserService: GapiUserService, private router: Router) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        if (!route.data.requiresLogin) {
            return true;
        } else if (this.gapiUserService.isSignedIn) {
            return true;
        }
        return this.gapiUserService
            .isSignedInObservable
            .pipe(tap((signedIn) => {
                if (!signedIn) {
                    this.router.navigate(['login', 'google']);
                }
            }));
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        return this.canActivate(route, state);
    }
}
