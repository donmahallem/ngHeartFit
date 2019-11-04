/*!
 * Source https://github.com/donmahallem/ngHeartFit
 */

import { HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { IFitDataSource } from '@donmahallem/google-fit-api-types';
import { of, Observable } from 'rxjs';
import { catchError, filter, map, take } from 'rxjs/operators';
import { FitApiDataSourceService } from 'src/app/service/fit-data-source.service';

@Injectable()
export class FitDataSourceDetailResolver implements Resolve<IFitDataSource> {
    constructor(private fitDataSourceService: FitApiDataSourceService,
                private router: Router) { }

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IFitDataSource> {
        const ids: string = route.params.id;
        return this.fitDataSourceService.getDataSource(ids)
            .pipe(filter((event: HttpEvent<IFitDataSource>): boolean =>
                (event.type === HttpEventType.Response)),
                map((val: HttpResponse<IFitDataSource>): IFitDataSource =>
                    val.body),
                take(1),
                catchError((err: any): Observable<IFitDataSource> => {
                    this.router.navigate(['/fit/datasources']);
                    return of(undefined);
                }));
    }
}
