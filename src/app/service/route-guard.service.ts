import { Injectable } from '@angular/core';
import {
    CanActivate,
    Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    CanActivateChild
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GoogleApiService } from 'ng-gapi';
import { GapiUserService } from './gapi-user.service';

@Injectable()
export class RouteGuardService implements CanActivate, CanActivateChild {

    constructor(private gapiUserService: GapiUserService, private router: Router) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        if (!route.data["requiresLogin"]) {
            return true;
        } else {
            return this.gapiUserService.isSignedInObservable()
                .pipe(map((authorized) => {
                    if (!authorized) {
                        this.router.navigate(["/login"]);
                    }
                    return authorized;
                }));
        }
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        return this.canActivate(route, state);
    }
}