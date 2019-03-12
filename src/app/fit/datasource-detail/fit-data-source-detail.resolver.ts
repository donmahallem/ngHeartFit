import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Resolve, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { delay, debounceTime, catchError, filter, map, tap, take } from 'rxjs/operators';
import { FitDataSource, FitApiDataSourceService } from 'src/app/service/fit-data-source.service';
import { HttpResponse, HttpEvent, HttpEventType } from '@angular/common/http';

@Injectable()
export class FitDataSourceDetailResolver implements Resolve<FitDataSource> {
    constructor(private fitDataSourceService: FitApiDataSourceService,
        private router: Router) { }

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<FitDataSource> {
        const ids: string = route.params['id'];
        return this.fitDataSourceService.getDataSource(ids)
            .pipe(filter((event: HttpEvent<FitDataSource>): boolean => {
                return (event.type === HttpEventType.Response);
            }),
                map((val: HttpResponse<FitDataSource>): FitDataSource => {
                    return val.body;
                }),
                take(1),
                catchError((err: any): Observable<FitDataSource> => {
                    this.router.navigate(["/fit/datasources"]);
                    return of(null);
                }));
    }
}
