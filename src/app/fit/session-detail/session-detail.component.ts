/*!
 * Source https://github.com/donmahallem/ngHeartFit
 */

import {
    AfterViewInit,
    Component,
    Input,
    OnDestroy,
} from '@angular/core';
import { IFitSession } from 'src/app/service/fit-api-modals';
@Component({
    selector: 'app-session-detail',
    styleUrls: ['./session-detail.component.scss'],
    templateUrl: './session-detail.component.pug',
})
export class SessionDetailComponent implements OnDestroy, AfterViewInit {
    private mSession: IFitSession;
    constructor() {
    }

    @Input('session')
    public set session(session: IFitSession) {
        this.mSession = session;
    }

    public get session(): IFitSession {
        return this.mSession;
    }

    public ngAfterViewInit() {
    }

    public ngOnDestroy() {
    }
}
