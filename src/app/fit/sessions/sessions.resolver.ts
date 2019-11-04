/*!
 * Source https://github.com/donmahallem/ngHeartFit
 */

import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { IFitSessionListResponse } from '@donmahallem/google-fit-api-types';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FitApiSessionService } from 'src/app/service/fit-session.service';

@Injectable()
export class SessionsResolver implements Resolve<IFitSessionListResponse> {
    constructor(private fitApi: FitApiSessionService) { }

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IFitSessionListResponse> {
        return this.fitApi
            .getSessions(moment().subtract(60, 'days'), moment())
            .pipe(map((resp) => {
                if (resp.type === HttpEventType.Response) {
                    return (resp as HttpResponse<IFitSessionListResponse>).body;
                }
                return undefined;
            }));
    }
}
