/*!
 * Source https://github.com/donmahallem/ngHeartFit
 */

import {
    AfterViewInit,
    Component,
    Input,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IFitSession } from '@donmahallem/google-fit-api-types';
import { map } from 'rxjs/operators';
@Component({
    selector: 'app-session-detail',
    styleUrls: ['./session-detail.component.scss'],
    templateUrl: './session-detail.component.pug',
})
export class SessionDetailComponent implements OnDestroy, AfterViewInit, OnInit {
    private mSession: IFitSession;
    constructor(private activatedRoute: ActivatedRoute) {
    }

    public ngOnInit(): void {
        this.activatedRoute.data
            .pipe(map((val: { session: IFitSession }) => val.session))
            .subscribe((resp: IFitSession) => {
                console.log('JJFJF', resp);
                this.mSession = resp;
            });
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
