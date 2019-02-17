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
import { FitApiDataSourceService, FitDataSource } from 'src/app/service/fit-data-source.service';
@Component({
    selector: 'datasources',
    templateUrl: './datasources.component.pug',
    styleUrls: ['./datasources.component.scss']
})
export class DatasourcesComponent implements OnDestroy, AfterViewInit {
    private mDataSources: FitDataSource[] = [];
    constructor(private zone: NgZone, private nggapi: FitApiDataSourceService) {
    }

    public get dataSources(): FitDataSource[] {
        return this.mDataSources;
    }

    public ngAfterViewInit() {
        this.nggapi.getDataSources()
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
