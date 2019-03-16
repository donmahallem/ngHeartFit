import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { catchError, filter, map, take, delay } from 'rxjs/operators';
import { NgGapiService, GapiStatus } from './service/nggapi-base.service';

@Injectable()
export class NgGapiResolver implements Resolve<boolean> {
    constructor(private nggapi: NgGapiService,
        private router: Router) { }

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.nggapi.statusObservable
            .pipe(filter((status: GapiStatus): boolean => {
                return status !== GapiStatus.LOADING;
            }), map((status: GapiStatus): true => {
                if (status === GapiStatus.FAILED) {
                    throw new Error();
                }
                return true;
            }),
                take(1),
                catchError((err: any): Observable<null> => {
                    this.router.navigate(["/error"]);
                    return of(null);
                }));
    }

}
