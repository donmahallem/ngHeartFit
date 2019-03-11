import {
    Component,
    NgZone,
    AfterViewInit,
    ViewChild,
    OnDestroy
} from '@angular/core';
import { LineChartComponent } from 'src/app/common-components/line-chart.component';
import * as moment from 'moment';
import { flatMap, debounceTime, delay, filter } from 'rxjs/operators';
import { BucketResponse } from 'src/app/service/fit-api-modals';
import { WeightChartService } from '../services/weight-chart.service';
import { Subscription } from 'rxjs';
import { FitApiDataSourceService, FitDataSourceList } from 'src/app/service/fit-data-source.service';
import { AggregateByFilter, FitApiAggregateService } from 'src/app/service/fit-aggregate.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
    selector: 'weight-chart',
    templateUrl: './weight-chart.component.pug',
    styleUrls: ['./weight-chart.component.scss']
})
export class WeightChartComponent implements AfterViewInit, OnDestroy {
    constructor(private zone: NgZone,
        private fitApiDataSource: FitApiDataSourceService,
        private fitApiAggregateService: FitApiAggregateService,
        private chartService: WeightChartService) {
    }
    @ViewChild(LineChartComponent)
    chart: LineChartComponent;
    private mSubscriptions: Subscription[] = [];


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
                flatMap((moments: [moment.Moment, moment.Moment]) => {
                    return this.fitApiDataSource.getDataSources(['com.google.body.fat.percentage'])
                        .pipe(filter((event) => {
                            return event.type === HttpEventType.Response;
                        }), flatMap((sources: HttpResponse<FitDataSourceList>) => {
                            const diff: number = 24 * 3600 * 1000;
                            const types: AggregateByFilter[] = [
                                {
                                    dataTypeName: 'com.google.weight'
                                }
                            ];
                            for (const datasource of sources.body.dataSource) {
                                types.push({
                                    dataTypeName: 'com.google.body.fat.percentage',
                                    dataSourceId: datasource.dataStreamId
                                });
                            }
                            return this.fitApiAggregateService.getAggregateData(types, moments[0], moments[1], diff);
                        }));
                }), delay(1000))
            .subscribe(this.updateData.bind(this), console.error));
    }

    public updateData(bucketResponse: BucketResponse): void {/*
        const weightDatapoints: ChartPoint[] = [];
        const fatDatapoints: ChartPoint[] = [];
        for (const bucket of bucketResponse.bucket) {
            for (const dataset of bucket.dataset) {
                if (dataset.point.length > 0) {
                    if (dataset.dataSourceId === 'derived:com.google.weight.summary:com.google.android.gms:aggregated') {
                        for (const p of dataset.point) {
                            const chartP: ChartPoint = {
                                x: new Date(parseInt(p.startTimeNanos.substr(0, p.startTimeNanos.length - 6), 10)),
                                y: p.value[0].fpVal
                            };
                            chartP['ymax'] = p.value[1].fpVal;
                            chartP['ymin'] = p.value[2].fpVal;
                            weightDatapoints.push(chartP);
                        }
                    } else if (dataset.dataSourceId === 'derived:com.google.body.fat.percentage.summary:com.google.android.gms:aggregated') {
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
