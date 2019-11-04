/*!
 * Source https://github.com/donmahallem/ngHeartFit
 */

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { of, Observable } from 'rxjs';
import { catchError, filter, map, take } from 'rxjs/operators';
import { GapiStatus, NgGapiService } from './service/nggapi-base.service';

@Injectable()
export class NgGapiResolver implements Resolve<boolean> {
    constructor(private nggapi: NgGapiService,
                private router: Router) { }

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.nggapi.statusObservable
            .pipe(filter((status: GapiStatus): boolean =>
                status !== GapiStatus.LOADING), map((status: GapiStatus): true => {
                    if (status === GapiStatus.FAILED) {
                        throw new Error();
                    }
                    return true;
                }),
                take(1),
                catchError((err: any): Observable<undefined> => {
                    this.router.navigate(['/error']);
                    return of(undefined);
                }));
    }

}
