import { HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { of, Observable } from 'rxjs';
import { catchError, filter, map, take } from 'rxjs/operators';
import { FitApiDataSourceService, FitDataSource } from 'src/app/service/fit-data-source.service';

@Injectable()
export class FitDataSourceDetailResolver implements Resolve<FitDataSource> {
    constructor(private fitDataSourceService: FitApiDataSourceService,
                private router: Router) { }

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<FitDataSource> {
        const ids: string = route.params.id;
        return this.fitDataSourceService.getDataSource(ids)
            .pipe(filter((event: HttpEvent<FitDataSource>): boolean =>
                (event.type === HttpEventType.Response)),
                map((val: HttpResponse<FitDataSource>): FitDataSource =>
                    val.body),
                take(1),
                catchError((err: any): Observable<FitDataSource> => {
                    this.router.navigate(['/fit/datasources']);
                    return of(null);
                }));
    }
}
