import { Injectable } from '@angular/core';
import {
    CanActivate,
    Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    CanActivateChild
} from '@angular/router';
import { Observable } from 'rxjs';
import { GapiUserService } from './gapi-user.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class RouteGuardService implements CanActivate, CanActivateChild {

    constructor(private gapiUserService: GapiUserService, private router: Router) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        if (!route.data["requiresLogin"]) {
            return true;
        }
        return this.gapiUserService
            .isSignedInObservable
            .pipe(tap((signedIn) => {
                if (!signedIn) {
                    this.router.navigate(['google', 'login']);
                }
            }))
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        return this.canActivate(route, state);
    }
}