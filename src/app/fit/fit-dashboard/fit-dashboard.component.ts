import {
    Component,
    AfterViewInit,
    OnDestroy,
    NgZone,
    OnInit
} from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { flatMap, debounceTime } from 'rxjs/operators';
import * as moment from 'moment';
import { FitDataSource, FitApiDataSourceService } from 'src/app/service/fit-data-source.service';
import { FitApiDataSetService } from 'src/app/service/fit-data-set.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { MatProgressBar } from '@angular/material';


@Component({
    selector: 'app-fit-dashboard',
    templateUrl: './fit-dashboard.component.pug',
    styleUrls: ['./fit-dashboard.component.scss']
})
export class FitDashboardComponent implements OnDestroy, AfterViewInit {

    private mDataSource: FitDataSource = null;
    private mRouteDataSubscription: Subscription;
    constructor(private zone: NgZone,
        private fitDataSetService: FitApiDataSetService,
        private activatedRoute: ActivatedRoute) {
    }

    public get dataSource(): FitDataSource {
        return this.mDataSource;
    }

    public get hasDataSource(): boolean {
        return (typeof this.mDataSource !== 'undefined');
    }

    public ngAfterViewInit() {
    }

    public get progressBarMode(): 'indeterminate' | 'query' {
        return 'query';
    }

    public ngOnDestroy() {
        if (this.mRouteDataSubscription) {
            this.mRouteDataSubscription.unsubscribe();
        }
    }
}
