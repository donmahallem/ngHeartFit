/*!
 * Source https://github.com/donmahallem/ngHeartFit
 */

import {
    Component,
    Input,
} from '@angular/core';
import { IFitSession } from 'src/app/service/fit-api-modals';
@Component({
    selector: 'app-session-list-item',
    styleUrls: ['./session.component.scss'],
    templateUrl: './session.component.pug',
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
