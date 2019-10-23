/*!
 * Source https://github.com/donmahallem/ngHeartFit
 */

import {
    Component,
    Input,
} from '@angular/core';
import { FitSession } from 'src/app/service/fit-api-modals';
@Component({
    selector: 'session-list-item',
    templateUrl: './session.component.pug',
    styleUrls: ['./session.component.scss'],
})
export class SessionComponent {
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
}
