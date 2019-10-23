/*!
 * Source https://github.com/donmahallem/ngHeartFit
 */

import {
    Component,
    Input,
} from '@angular/core';
import { IFitSession } from 'src/app/service/fit-api-modals';
@Component({
    selector: 'session-list-item',
    templateUrl: './session.component.pug',
    styleUrls: ['./session.component.scss'],
})
export class SessionComponent {
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
}
