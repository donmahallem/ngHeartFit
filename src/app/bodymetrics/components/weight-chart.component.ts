/*!
 * Source https://github.com/donmahallem/ngHeartFit
 */

import { HttpEventType, HttpResponse } from '@angular/common/http';
import {
    AfterViewInit,
    Component,
    OnDestroy,
    ViewChild,
} from '@angular/core';
import { IFitBucketResponse } from '@donmahallem/google-fit-api-types';
import * as moment from 'moment';
import { Subscriber, Subscription } from 'rxjs';
import { debounceTime, delay, filter, flatMap } from 'rxjs/operators';
import { LineChartComponent } from 'src/app/common-components/line-chart';
import { FitApiAggregateService, IAggregateByFilter } from 'src/app/service/fit-aggregate.service';
import { FitApiDataSourceService, IFitDataSourceList } from 'src/app/service/fit-data-source.service';
import { WeightChartService } from '../services/weight-chart.service';

@Component({
    selector: 'app-weight-chart',
    styleUrls: ['./weight-chart.component.scss'],
    templateUrl: './weight-chart.component.pug',
})
export class WeightChartComponent implements AfterViewInit, OnDestroy {
    @ViewChild(LineChartComponent, { static: false })
    chart: LineChartComponent;
    private mSubscriptions: Subscription[] = [];
    constructor(private fitApiDataSource: FitApiDataSourceService,
                private fitApiAggregateService: FitApiAggregateService,
                private chartService: WeightChartService) {
    }

    public onSubmit(): void {

    }

    public ngOnDestroy() {
        for (const sub of this.mSubscriptions) {
            sub.unsubscribe();
        }
        this.mSubscriptions = [];
    }

    public ngAfterViewInit(): void {

        /**
         * debounce so no double emissions
         */
        this.mSubscriptions.push(this.chartService
            .combinedDateListener
            .pipe(debounceTime(100),
                flatMap((moments: [moment.Moment, moment.Moment]) =>
                    this.fitApiDataSource.getDataSources(['com.google.body.fat.percentage'])
                        .pipe(filter((event) =>
                            event.type === HttpEventType.Response), flatMap((sources: HttpResponse<IFitDataSourceList>) => {
                                const diff: number = 24 * 3600 * 1000;
                                const types: IAggregateByFilter[] = [
                                    {
                                        dataTypeName: 'com.google.weight',
                                    },
                                ];
                                for (const datasource of sources.body.dataSource) {
                                    types.push({
                                        dataSourceId: datasource.dataStreamId,
                                        dataTypeName: 'com.google.body.fat.percentage',
                                    });
                                }
                                return this.fitApiAggregateService.getAggregateData(types, moments[0], moments[1], diff);
                            }))), delay(1000))
            // tslint:disable-next-line:no-console
            .subscribe(new Subscriber(this.updateData.bind(this), console.error)));
    }

    public updateData(bucketResponse: IFitBucketResponse): void {/*
        const weightDatapoints: ChartPoint[] = [];
        const fatDatapoints: ChartPoint[] = [];
        for (const bucket of bucketResponse.bucket) {
            for (const dataset of bucket.dataset) {
                if (dataset.point.length > 0) {
                    if (dataset.dataSourceId ===
                        'derived:com.google.weight.summary:com.google.android.gms:aggregated') {
                        for (const p of dataset.point) {
                            const chartP: ChartPoint = {
                                x: new Date(parseInt(p.startTimeNanos
                                    .substr(0, p.startTimeNanos.length - 6), 10)),
                                y: p.value[0].fpVal
                            };
                            chartP['ymax'] = p.value[1].fpVal;
                            chartP['ymin'] = p.value[2].fpVal;
                            weightDatapoints.push(chartP);
                        }
                    } else if (dataset.dataSourceId ===
                        'derived:com.google.body.fat.percentage.summary:com.google.android.gms:aggregated') {
                        for (const p of dataset.point) {
                            const chartP: ChartPoint = {
                                x: new Date(parseInt(p.startTimeNanos.substr(0, p.startTimeNanos.length - 6), 10)),
                                y: p.value[0].fpVal
                            };
                            chartP['ymax'] = p.value[1].fpVal;
                            chartP['ymin'] = p.value[2].fpVal;
                            fatDatapoints.push(chartP);
                        }
                    } else {
                        console.log(dataset);
                    }
                }
            }
        }
        this.chart.chart.data.datasets[0].data = weightDatapoints;
        this.chart.chart.data.datasets[1].data = fatDatapoints;*/
        // this.chart.chart.config.options.scales.xAxes[0].
    }
}
