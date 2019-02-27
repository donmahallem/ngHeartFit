import {
    Component,
    OnInit,
    ViewChild,
    AfterViewInit,
    OnDestroy,
    ChangeDetectorRef,
    NgZone
} from '@angular/core';
import { FitSession } from 'src/app/service/fit-api-modals';
import * as moment from 'moment';
import { FitApiSessionService } from 'src/app/service/fit-session.service';

@Component({
    selector: 'sessions-list',
    templateUrl: './sessions.component.pug',
    styleUrls: ['./sessions.component.scss']
})
export class SessionsComponent implements OnDestroy, AfterViewInit {
    private mSessions: FitSession[] = [];
    constructor(private zone: NgZone,
        private sessionService: FitApiSessionService) {
    }

    public get sessions(): FitSession[] {
        return this.mSessions;
    }

    public ngAfterViewInit() {
        this.sessionService.getSessions()
            .subscribe((dat) => {
                console.log(dat);
                this.zone.run(() => {
                    this.mSessions = dat.session;
                });
            }, console.error);
    }

    public ngOnDestroy() {
    }
}
