/*!
 * Source https://github.com/donmahallem/ngHeartFit
 */

import { HttpEvent } from '@angular/common/http';
import {
    Component,
} from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { LoadableListComponent } from 'src/app/common-components/sessions.component';
import { IFitSession, IListSessionsResponse } from 'src/app/service/fit-api-modals';
import { FitApiSessionService } from 'src/app/service/fit-session.service';

@Component({
    selector: 'app-sessions-list',
    styleUrls: ['./sessions.component.scss'],
    templateUrl: './sessions.component.pug',
})
export class SessionsComponent extends LoadableListComponent<IListSessionsResponse> {
    private mSessions: IFitSession[] = [];
    constructor(private sessionService: FitApiSessionService) {
        super();
    }

    public onResult(result: IListSessionsResponse) {
        this.mSessions = result.session;
    }

    public createLoadObservable(): Observable<HttpEvent<IListSessionsResponse>> {
        return this.sessionService.getSessions(moment().subtract(120, 'days').toISOString(), moment().toISOString());
    }
    public get sessions(): IFitSession[] {
        return this.mSessions;
    }

    public set sessions(s: IFitSession[]) {
        this.mSessions = s;
    }
}
