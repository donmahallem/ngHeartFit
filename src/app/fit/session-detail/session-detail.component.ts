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
import { DataSourceListResponse, DataSourceInformation } from 'src/app/service/fit-api-modals';
@Component({
    selector: 'session-detail',
    templateUrl: './session-detail.component.pug',
    styleUrls: ['./session-detail.component.scss']
})
export class SessionDetailComponent implements OnDestroy, AfterViewInit {
    private mDataSource: DataSourceInformation;
    constructor(private zone: NgZone, private nggapi: FitApiService) {
    }

    @Input('session')
    public set dataSource(source: DataSourceInformation) {
        this.mDataSource = source;
    }

    public get dataSource(): DataSourceInformation {
        return this.mDataSource;
    }

    public ngAfterViewInit() {
    }

    public ngOnDestroy() {
    }
}
