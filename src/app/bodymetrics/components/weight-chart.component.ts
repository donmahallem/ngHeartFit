import {
    Component,
    NgZone,
    AfterViewInit,
    ViewChild,
    OnDestroy
} from '@angular/core';
import { ChartComponent } from 'src/app/common-components/chart.component';
import * as moment from 'moment';
import { FitApiService, AggregateByFilter } from 'src/app/service/fit-api.service';
import { ChartPoint, ChartConfiguration } from 'chart.js';
import { flatMap, debounceTime, delay } from 'rxjs/operators';
import { DataSourceListResponse, BucketResponse } from 'src/app/service/fit-api-modals';
import { WeightChartService } from '../services/weight-chart.service';
import { Subscription } from 'rxjs';
import { ChartJsMinMaxPlugin } from './chartjs-min-max.plugin';
import { chartConfig } from './weight-chart.config';

@Component({
    selector: 'weight-chart',
    templateUrl: './weight-chart.component.pug',
    styleUrls: ['./weight-chart.component.scss']
})
export class WeightChartComponent implements AfterViewInit, OnDestroy {
    @ViewChild(ChartComponent)
    chart: ChartComponent;
    private mSubscriptions: Subscription[] = [];
    constructor(private zone: NgZone,
        private fitApi: FitApiService,
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

    public chartConfig: ChartConfiguration = chartConfig;

    public ngAfterViewInit(): void {

        /**
         * debounce so no double emissions
         */
        this.mSubscriptions.push(this.chartService
            .combinedDateListener
            .pipe(debounceTime(100),
                flatMap((moments: [moment.Moment, moment.Moment]) => {
                    const diff: number = 24 * 3600 * 1000;
                    const types: AggregateByFilter[] = [
                        {
                            dataTypeName: 'com.google.weight'
                        },
                        {
                            dataTypeName: 'com.google.body.fat.percentage'
                        }
                    ]
                    return this.fitApi.getAggregateData(types, moments[0], moments[1], diff);
                }), delay(1000))
            .subscribe(this.updateData.bind(this), console.error));
    }

    public updateData(bucketResponse: BucketResponse): void {
        console.log("UpdateData");
        const weightDatapoints: ChartPoint[] = [];
        const fatDatapoints: ChartPoint[] = [];
        for (const bucket of bucketResponse.bucket) {
            for (const dataset of bucket.dataset) {
                if (dataset.point.length > 0) {
                    if (dataset.dataSourceId === 'derived:com.google.weight.summary:com.google.android.gms:aggregated') {
                        for (const p of dataset.point) {
                            const chartP: ChartPoint = {
                                x: new Date(parseInt(p.startTimeNanos.substr(0, p.startTimeNanos.length - 6))),
                                y: p.value[0].fpVal
                            };
                            chartP['ymax'] = p.value[1].fpVal;
                            chartP['ymin'] = p.value[2].fpVal;
                            weightDatapoints.push(chartP);
                        }
                    } else if (dataset.dataSourceId === 'derived:com.google.body.fat.percentage.summary:com.google.android.gms:aggregated') {
                        for (const p of dataset.point) {
                            const chartP: ChartPoint = {
                                x: new Date(parseInt(p.startTimeNanos.substr(0, p.startTimeNanos.length - 6))),
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
        this.chart.chart.data.datasets[1].data = fatDatapoints;
        //this.chart.chart.config.options.scales.xAxes[0].
        this.zone.run(() => {
            this.chart.chart.update(this.chart.chart.config.options);
        })
    }
}
