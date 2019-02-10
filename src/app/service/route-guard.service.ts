import { Injectable } from '@angular/core';
import {
    CanActivate,
    Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    CanActivateChild
} from '@angular/router';
import { Observable } from 'rxjs';
import { GapiAuthService } from './gapi-auth.service';

@Injectable()
export class RouteGuardService implements CanActivate, CanActivateChild {

    constructor(private gapiUserService: GapiAuthService, private router: Router) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        if (!route.data['requiresLogin']) {
            return true;
        } else {
            return true;
        }
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        return this.canActivate(route, state);
    }
}
