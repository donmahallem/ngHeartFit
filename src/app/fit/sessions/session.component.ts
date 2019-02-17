import {
    Component,
    OnInit,
    ViewChild,
    AfterViewInit,
    OnDestroy,
    ChangeDetectorRef,
    NgZone,
    Input
} from '@angular/core';
import { Subscription } from 'rxjs';
import { GapiUserService } from 'src/app/service/gapi-user.service';
import { FitApiService } from 'src/app/service/fit-api.service';
import { Router } from '@angular/router';
import { FitSession } from 'src/app/service/fit-api-modals';
@Component({
    selector: 'session-list-item',
    templateUrl: './session.component.pug',
    styleUrls: ['./session.component.scss']
})
export class SessionComponent implements OnDestroy, AfterViewInit {
    private mDataSource: FitSession;
    constructor(private zone: NgZone, private nggapi: FitApiService) {
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
