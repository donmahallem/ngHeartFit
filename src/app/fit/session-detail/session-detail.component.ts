import {
    Component,
    AfterViewInit,
    OnDestroy,
    Input
} from '@angular/core';
import { FitSession } from 'src/app/service/fit-api-modals';
@Component({
    selector: 'session-detail',
    templateUrl: './session-detail.component.pug',
    styleUrls: ['./session-detail.component.scss']
})
export class SessionDetailComponent implements OnDestroy, AfterViewInit {
    private mDataSource: FitSession;
    constructor() {
    }

    @Input('session')
    public set dataSource(source: FitSession) {
        this.mDataSource = source;
    }

    public get dataSource(): FitSession {
        return this.mDataSource;
    }

    public ngAfterViewInit() {
    }

    public ngOnDestroy() {
    }
}
