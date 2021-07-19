/*!
 * Source https://github.com/donmahallem/ngHeartFit
 */

import { HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { IFitSessionListResponse } from '@donmahallem/google-fit-api-types';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FitApiSessionService } from 'src/app/service/fit-session.service';

@Injectable()
export class SessionsResolver implements Resolve<IFitSessionListResponse> {
    constructor(private fitApi: FitApiSessionService,
                private router: Router) { }

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IFitSessionListResponse> {
        let obs: Observable<HttpEvent<IFitSessionListResponse>>;
        if (route.queryParams.from && route.queryParams.to) {
            obs = this.fitApi
                .getSessions(moment(route.queryParams.from), moment(route.queryParams.to));
        } else {
            obs = this.fitApi
                .getSessions(moment().subtract(60, 'days'), moment());
        }
        return obs
            .pipe(map((resp) => {
                if (resp.type === HttpEventType.Response) {
                    const respBody: IFitSessionListResponse = (resp as HttpResponse<IFitSessionListResponse>).body;
                    return respBody;
                }
                return undefined;
            }));
    }
}
