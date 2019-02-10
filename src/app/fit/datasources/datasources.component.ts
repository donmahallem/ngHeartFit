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
import { DataSourceListResponse, DataSourceInformation } from 'src/app/service/fit-api-modals';
@Component({
    selector: 'datasources',
    templateUrl: './datasources.component.pug',
    styleUrls: ['./datasources.component.scss']
})
export class DatasourcesComponent implements OnDestroy, AfterViewInit {
    private mDataSources: DataSourceInformation[] = [];
    constructor(private zone: NgZone, private nggapi: FitApiService) {
    }

    public get dataSources(): DataSourceInformation[] {
        return this.mDataSources;
    }

    public ngAfterViewInit() {
        this.nggapi.getAllDataSources()
            .subscribe((dat) => {
                console.log(dat);
                this.zone.run(() => {
                    this.mDataSources = dat.dataSource;
                });
            }, console.error);
    }

    public ngOnDestroy() {
    }
}
