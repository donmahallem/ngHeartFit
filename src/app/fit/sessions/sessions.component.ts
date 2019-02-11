import {
    Component,
    OnInit,
    ViewChild,
    AfterViewInit,
    OnDestroy,
    ChangeDetectorRef,
    NgZone
} from '@angular/core';
import { Subscription } from 'rxjs';
import { GapiUserService } from 'src/app/service/gapi-user.service';
import { FitApiService } from 'src/app/service/fit-api.service';
import { Router } from '@angular/router';
import { DataSourceListResponse, DataSourceInformation, FitSession } from 'src/app/service/fit-api-modals';
import * as moment from 'moment';

@Component({
    selector: 'sessions-list',
    templateUrl: './sessions.component.pug',
    styleUrls: ['./sessions.component.scss']
})
export class SessionsComponent implements OnDestroy, AfterViewInit {
    private mDataSources: FitSession[] = [];
    constructor(private zone: NgZone, private nggapi: FitApiService) {
    }

    public get dataSources(): FitSession[] {
        return this.mDataSources;
    }

    public ngAfterViewInit() {
        this.nggapi.getSessions(moment().subtract(3, 'month'), moment())
            .subscribe((dat) => {
                console.log(dat);
                this.zone.run(() => {
                    this.mDataSources = dat.session;
                });
            }, console.error);
    }

    public ngOnDestroy() {
    }
}
