/*!
 * Source https://github.com/donmahallem/ngHeartFit
 */

import { HttpEvent } from '@angular/common/http';
import {
    Component, OnDestroy, OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IFitSession, IFitSessionListResponse } from '@donmahallem/google-fit-api-types';
import * as moment from 'moment';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { FitApiSessionService } from 'src/app/service/fit-session.service';
import { IMomentFit, Momentary } from 'src/app/util';

@Component({
    selector: 'app-sessions-list',
    styleUrls: ['./sessions.component.scss'],
    templateUrl: './sessions.component.pug',
})
export class SessionsComponent implements OnInit, OnDestroy {
    private mSessions: IMomentFit<IFitSession>[] = [];
    private mDataSubscription: Subscription;
    constructor(private sessionService: FitApiSessionService,
                private activatedRoute: ActivatedRoute) {
    }
    public get sessions(): IMomentFit<IFitSession>[] {
        return this.mSessions;
    }

    public set sessions(s: IMomentFit<IFitSession>[]) {
        this.mSessions = s;
    }
    public ngOnDestroy(): void {
        this.mDataSubscription.unsubscribe();
    }
    public ngOnInit(): void {
        this.mDataSubscription = this.activatedRoute.data
            .pipe(map((val) =>
                val.sessions)).subscribe((resp) => {
                    this.mSessions = resp.session
                        .map((session: IFitSession): IMomentFit<IFitSession> =>
                            Momentary.convert(session));
                });
    }
    public createLoadObservable(): Observable<HttpEvent<IFitSessionListResponse>> {
        return this.sessionService.getSessions(moment().subtract(120, 'days'), moment());
    }
}
