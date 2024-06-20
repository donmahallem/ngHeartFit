/*!
 * Source https://github.com/donmahallem/ngHeartFit
 */

import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { IFitSession, IFitSessionListResponse } from '@donmahallem/google-fit-api-types';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { FitApiSessionService } from 'src/app/service/fit-session.service';

@Injectable()
export class SessionResolver implements Resolve<IFitSession> {
    constructor(private fitApi: FitApiSessionService,
                private router: Router) { }

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IFitSession> {
        console.log(route.params.from, route.params.to, route.params.id);
        const obs: Observable<IFitSession> =
            this.fitApi
                .getSessions(moment(route.params.from), moment(route.params.to))
                .pipe(
                    filter((resp) =>
                        resp.type === HttpEventType.Response),
                    map((resp: HttpResponse<IFitSessionListResponse>) =>
                        resp.body.session),
                    map((values: IFitSession[]): IFitSession => {
                        console.log('FOUTN', values);
                        const filtered: IFitSession[] = values
                            .filter((value: IFitSession) =>
                                value.id === route.params.id);
                        console.log('JJ', filtered);
                        if (filtered.length !== 1) {
                            throw new Error();
                        }
                        return filtered[0];
                    }));
        return obs;
    }
}
