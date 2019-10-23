import {
    AfterViewInit,
    Component,
    Input,
    OnDestroy,
} from '@angular/core';
import { FitSession } from 'src/app/service/fit-api-modals';
@Component({
    selector: 'session-detail',
    templateUrl: './session-detail.component.pug',
    styleUrls: ['./session-detail.component.scss'],
})
export class SessionDetailComponent implements OnDestroy, AfterViewInit {
    private mSession: FitSession;
    constructor() {
    }

    @Input('session')
    public set session(session: FitSession) {
        this.mSession = session;
    }

    public get session(): FitSession {
        return this.mSession;
    }

    public ngAfterViewInit() {
    }

    public ngOnDestroy() {
    }
}
