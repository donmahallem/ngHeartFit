/*!
 * Source https://github.com/donmahallem/ngHeartFit
 */

import { HttpEventType, HttpResponse } from '@angular/common/http';
import {
    AfterViewInit,
    Component,
    NgZone,
    OnDestroy,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { filter, flatMap } from 'rxjs/operators';
import { FitApiAggregateService } from 'src/app/service/fit-aggregate.service';
import { FitApiDataSetService, IInsertDataPoint } from 'src/app/service/fit-data-set.service';
import { FitApiDataSourceService, IFitDataSource } from 'src/app/service/fit-data-source.service';

@Component({
    selector: 'app-fit-dashboard',
    templateUrl: './fit-dashboard.component.pug',
    styleUrls: ['./fit-dashboard.component.scss'],
})
export class FitDashboardComponent implements OnDestroy, AfterViewInit {

    private mDataSource: IFitDataSource = null;
    private mRouteDataSubscription: Subscription;
    constructor(private zone: NgZone,
                private fitDataSetService: FitApiDataSetService,
                private fitAggregateService: FitApiAggregateService,
                private datasourceService: FitApiDataSourceService,
                private activatedRoute: ActivatedRoute) {
    }

    public get dataSource(): IFitDataSource {
        return this.mDataSource;
    }

    public get hasDataSource(): boolean {
        return (typeof this.mDataSource !== 'undefined');
    }

    public ngAfterViewInit() {
        this.fitAggregateService
            .getAggregateData([{
                dataTypeName: 'com.google.weight',
            }, {
                dataTypeName: 'com.google.body.fat.percentage',
            }, {
                dataTypeName: 'com.google.hydration',
            }], moment().subtract(30, 'days'), moment(), 1000 * 3600 * 24)
            .subscribe(console.log, console.error);
    }

    public get progressBarMode(): 'indeterminate' | 'query' {
        return 'query';
    }

    public insertBodyFat(): void {
        this.datasourceService
            .getOrCreateBodyFatPercentageDataSource()
            .pipe(
                filter((val) =>
                    val.type === HttpEventType.Response),
                flatMap((datasource: HttpResponse<IFitDataSource>) => {
                    const end: moment.Moment = moment();
                    const endTimestamp: number = end.valueOf();
                    const ps: IInsertDataPoint[] = [];
                    const windowSize = 12345678;
                    for (let i = 0; i < 100; i++) {
                        const ts: number = endTimestamp - (windowSize * i);
                        ps.push({
                            startTimeNanos: ts * 1000000,
                            endTimeNanos: ts * 1000000,
                            dataTypeName: 'com.google.body.fat.percentage',
                            value: [{ fpVal: Math.random() * 100 }],
                        });
                    }
                    const start: moment.Moment = moment(endTimestamp - (windowSize * 99));

                    return this.fitDataSetService.insertData(datasource.body.dataStreamId, start, end, ps);
                }))
            .subscribe(console.log);
    }

    public ngOnDestroy() {
        if (this.mRouteDataSubscription) {
            this.mRouteDataSubscription.unsubscribe();
        }
    }
}
