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

interface TestAxis {
    getPixelForValue(value: number, index: number, datasetIndex: number, includeOffset: boolean): number;
    getValueForPixel(pixel: number);
}

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
                label: 'Weight',
                pointRadius: 3,
                pointHoverRadius: 10,
                type: 'line',
                borderColor: '#004ba0',
                pointBackgroundColor: 'rgba(0,75,160,0.5)',
                fill: false,
                backgroundColor: 'rgba(0,75,160,0.5)',
                data: [],
                yAxisID: 'weightAxis'
            }, {
                label: 'Body Fat',
                pointRadius: 3,
                pointHoverRadius: 10,
                type: 'line',
                borderColor: 'rgb(255,160,0)',
                pointBackgroundColor: 'rgba(0,75,160,0.5)',
                fill: false,
                backgroundColor: 'rgb(255,160,0,0.5)',
                data: [],
                yAxisID: 'fatAxis',
                steppedLine: true
            }]
        },
        plugins: [{
            beforeDatasetDraw: (chart: Chart, options) => {
                const ctx = chart.ctx;
                const xaxis: TestAxis = (<any>chart).scales['x-axis-0'];;
                //const yAxisWeight: TestAxis = (<any>chart).scales['weightAxis'];
                //const yAxisFat: TestAxis = (<any>chart).scales['fatAxis'];
                const datasets = chart.data.datasets;
                ctx.save();

                for (let datasetId = 0; datasetId < datasets.length; datasetId++) {
                    const dataset: Chart.ChartDataSets = datasets[datasetId];
                    const yAxis: TestAxis = (<any>chart).scales[dataset.yAxisID];

                    // get meta for both data sets
                    var meta1 = chart.getDatasetMeta(datasetId);
                    //var meta2 = chart.getDatasetMeta(dataset.fillBetweenSet);

                    // do not draw fill if one of the datasets is hidden
                    if (meta1.hidden) continue;
                    if (meta1.data.length < 2) continue;
                    ctx.beginPath();
                    let curr = meta1.data[0];
                    let next = meta1.data[1];
                    let currDot = datasets[datasetId].data[curr._index];
                    let nextDot = datasets[datasetId].data[next._index];
                    let currValueY = yAxis.getPixelForValue(currDot['ymax'], 0, 0, false);
                    let nextValueY = yAxis.getPixelForValue(nextDot['ymax'], 0, 0, false);
                    ctx.moveTo(curr._view.x, currValueY);
                    // create fill areas in pairs
                    for (let p = 0; p < meta1.data.length - 1; p++) {
                        curr = meta1.data[p];
                        next = meta1.data[p + 1];
                        currDot = datasets[datasetId].data[curr._index];
                        nextDot = datasets[datasetId].data[next._index];
                        currValueY = yAxis.getPixelForValue(currDot['ymax'], 0, 0, false);
                        nextValueY = yAxis.getPixelForValue(nextDot['ymax'], 0, 0, false);
                        if (curr._view.steppedLine === true) {
                            ctx.lineTo(next._view.x, currValueY);
                            ctx.lineTo(next._view.x, nextValueY);
                        }
                        else if (next._view.tension === 0) {
                            ctx.lineTo(next._view.x, nextValueY);
                        }
                        else {
                            ctx.bezierCurveTo(
                                curr._view.controlPointNextX,
                                currValueY,
                                next._view.controlPointPreviousX,
                                nextValueY,
                                next._view.x,
                                nextValueY
                            );
                        }
                    }
                    currValueY = yAxis.getPixelForValue(nextDot['ymin'], 0, 0, false);
                    ctx.lineTo(next._view.x, currValueY)
                    for (let p = meta1.data.length - 1; p > 0; p--) {
                        curr = meta1.data[p];
                        next = meta1.data[p - 1];
                        currDot = datasets[datasetId].data[curr._index];
                        nextDot = datasets[datasetId].data[next._index];
                        currValueY = yAxis.getPixelForValue(currDot['ymin'], 0, 0, false);
                        nextValueY = yAxis.getPixelForValue(nextDot['ymin'], 0, 0, false);
                        if (curr._view.steppedLine === true) {
                            ctx.lineTo(next._view.x, currValueY);
                            ctx.lineTo(next._view.x, nextValueY);
                        }
                        else if (next._view.tension === 0) {
                            ctx.lineTo(next._view.x, nextValueY);
                        }
                        else {
                            ctx.bezierCurveTo(
                                curr._view.controlPointPreviousX,
                                currValueY,
                                next._view.controlPointNextX,
                                nextValueY,
                                next._view.x,
                                nextValueY
                            );
                        }
                    }
                    ctx.closePath();
                    ctx.fillStyle = <string>dataset.backgroundColor;
                    ctx.fill();
                }
            }
        }],
        options: {
            responsive: true,
            maintainAspectRatio: false,
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
                    },
                    id: 'x-axis-0'
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Weight'
                    },

                    ticks: {
                        beginAtZero: true
                    },
                    id: 'weightAxis'
                }, {
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Body Fat Percentage'
                    },
                    ticks: {
                        beginAtZero: true,
                        suggestedMin: 0,
                        suggestedMax: 100
                    },
                    position: 'right',
                    id: 'fatAxis'
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
