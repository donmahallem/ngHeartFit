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

    public chartConfig: ChartConfiguration = {
        type: 'line',
        data: {
            datasets: [{
                label: 'Dataset with string point data',
                fill: false,
                data: [],
            }, {
                label: 'Dataset with date object point data',
                fill: false,
                data: []
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,/*
            animation: {
                duration: 0
            },
            hover: {
                animationDuration: 0
            },
            responsiveAnimationDuration: 0,*/
            title: {
                display: true,
                text: 'Chart.js Time Point Data'
            },
            scales: {
                xAxes: [{
                    type: 'time',
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Date'
                    },
                    ticks: {
                        major: {
                            fontStyle: 'bold',
                            fontColor: '#FF0000'
                        }
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'value'
                    },
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
            layout: {
                padding: {
                    left: 20,
                    right: 20,
                    top: 10,
                    bottom: 10
                }
            }
        }
    };

    public ngAfterViewInit(): void {

        this.chart.chart.data.datasets = [{
            label: 'Weight',
            pointRadius: 3,
            pointHoverRadius: 10,
            type: 'line',
            borderColor: '#004ba0',
            pointBackgroundColor: 'rgba(0,75,160,0.5)',
            fill: true,
            backgroundColor: 'rgba(0,75,160,0.5)',
            data: []
        }, {
            label: 'Body Fat',
            pointRadius: 3,
            pointHoverRadius: 10,
            type: 'line',
            borderColor: 'rgb(255,160,0)',
            pointBackgroundColor: 'rgba(0,75,160,0.5)',
            fill: true,
            backgroundColor: 'rgb(255,160,0,0.5)',
            data: []
        }];
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
        const weightDatapoints: ChartPoint[] = [];
        const fatDatapoints: ChartPoint[] = [];
        for (const bucket of bucketResponse.bucket) {
            for (const dataset of bucket.dataset) {
                if (dataset.point.length > 0) {
                    if (dataset.dataSourceId === 'derived:com.google.weight.summary:com.google.android.gms:aggregated') {
                        for (const p of dataset.point) {
                            weightDatapoints.push({
                                x: new Date(parseInt(p.startTimeNanos.substr(0, p.startTimeNanos.length - 6))),
                                y: p.value[0].fpVal
                            });
                        }
                    } else if (dataset.dataSourceId === 'derived:com.google.body.fat.percentage.summary:com.google.android.gms:aggregated') {
                        for (const p of dataset.point) {
                            fatDatapoints.push({
                                x: new Date(parseInt(p.startTimeNanos.substr(0, p.startTimeNanos.length - 6))),
                                y: p.value[0].fpVal
                            });
                        }
                    } else {
                        console.log(dataset);
                    }
                }
            }
        }
        this.zone.run(() => {
            this.chart.chart.data.datasets[0].data = weightDatapoints;
            this.chart.chart.data.datasets[1].data = fatDatapoints;
            this.chart.chart.update(this.chart.chart.config.options);
        });
    }
}
