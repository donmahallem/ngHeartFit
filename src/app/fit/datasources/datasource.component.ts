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
import { FitDataSource } from 'src/app/service/fit-data-source.service';
@Component({
    selector: 'datasource',
    templateUrl: './datasource.component.pug',
    styleUrls: ['./datasource.component.scss']
})
export class DatasourceComponent implements OnDestroy, AfterViewInit {
    private mDataSource: FitDataSource;
    constructor(private zone: NgZone, private nggapi: FitApiService) {
    }

    @Input('dataSource')
    public set dataSource(source: FitDataSource) {
        this.mDataSource = source;
    }

    public get dataSource(): FitDataSource {
        return this.mDataSource;
    }

    public ngAfterViewInit() {
    }

    public ngOnDestroy() {
    }
}
