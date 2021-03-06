/*!
 * Source https://github.com/donmahallem/ngHeartFit
 */

import {
    Component,
    Input,
} from '@angular/core';
import { IFitSession } from '@donmahallem/google-fit-api-types';
import { IMomentFit } from 'src/app/util';
@Component({
    selector: 'app-session-list-item',
    styleUrls: ['./session.component.scss'],
    templateUrl: './session.component.pug',
})
export class SessionComponent {
    private mSession: IMomentFit<IFitSession>;
    constructor() {
    }

    @Input('session')
    public set session(session: IMomentFit<IFitSession>) {
        this.mSession = session;
    }

    public get session(): IMomentFit<IFitSession> {
        return this.mSession;
    }
}
