/*!
 * Source https://github.com/donmahallem/ngHeartFit
 */

import { HttpEventType, HttpResponse } from '@angular/common/http';
import {
    AfterViewInit,
    Component,
    OnDestroy,
} from '@angular/core';
import { IFitDatasetPoint, IFitDataSource } from '@donmahallem/google-fit-api-types';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { filter, flatMap } from 'rxjs/operators';
import {
    FitApiAggregateService,
    FitApiDataSetService,
    FitApiDataSourceService,
} from 'src/app/service';

@Component({
    selector: 'app-fit-dashboard',
    styleUrls: ['./fit-dashboard.component.scss'],
    templateUrl: './fit-dashboard.component.pug',
})
export class FitDashboardComponent implements OnDestroy, AfterViewInit {

    private mDataSource: IFitDataSource = undefined;
    private mRouteDataSubscription: Subscription;
    constructor(private fitDataSetService: FitApiDataSetService,
                private fitAggregateService: FitApiAggregateService,
                private datasourceService: FitApiDataSourceService) {
    }

    public get dataSource(): IFitDataSource {
        return this.mDataSource;
    }

    public get hasDataSource(): boolean {
        return (typeof this.mDataSource !== 'undefined');
    }

    public get progressBarMode(): 'indeterminate' | 'query' {
        return 'query';
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
            // tslint:disable-next-line:no-console
            .subscribe(console.log, console.error);
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
                    const ps: IFitDatasetPoint[] = [];
                    const windowSize = 12345678;
                    for (let i = 0; i < 100; i++) {
                        const ts: number = endTimestamp - (windowSize * i);
                        ps.push({
                            dataTypeName: 'com.google.body.fat.percentage',
                            endTimeNanos: ts + '000000',
                            startTimeNanos: ts + '000000',
                            value: [{ fpVal: Math.random() * 100 }],
                        });
                    }
                    const start: moment.Moment = moment(endTimestamp - (windowSize * 99));

                    return this.fitDataSetService.insertData(datasource.body.dataStreamId, start, end, ps);
                }))
            // tslint:disable-next-line:no-console
            .subscribe(console.log);
    }

    public ngOnDestroy() {
        if (this.mRouteDataSubscription) {
            this.mRouteDataSubscription.unsubscribe();
        }
    }
}
