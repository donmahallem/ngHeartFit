/*!
 * Source https://github.com/donmahallem/ngHeartFit
 */

import { HttpEvent } from '@angular/common/http';
import {
    Component,
    NgZone,
} from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { LoadableListComponent } from 'src/app/common-components/sessions.component';
import { FitSession, ListSessionsResponse } from 'src/app/service/fit-api-modals';
import { FitApiSessionService } from 'src/app/service/fit-session.service';

@Component({
    selector: 'app-sessions-list',
    templateUrl: './sessions.component.pug',
    styleUrls: ['./sessions.component.scss'],
})
export class SessionsComponent extends LoadableListComponent<ListSessionsResponse> {
    private mSessions: FitSession[] = [];
    constructor(private zone: NgZone,
                private sessionService: FitApiSessionService) {
        super();
    }

    public onResult(result: ListSessionsResponse) {
        this.mSessions = result.session;
    }

    public createLoadObservable(): Observable<HttpEvent<ListSessionsResponse>> {
        return this.sessionService.getSessions(moment().subtract(120, 'days').toISOString(), moment().toISOString());
    }
    public get sessions(): FitSession[] {
        return this.mSessions;
    }

    public set sessions(s: FitSession[]) {
        this.mSessions = s;
    }
}
