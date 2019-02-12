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
import { flatMap } from 'rxjs/operators';
import { DataSourceListResponse } from 'src/app/service/fit-api-modals';
import { WeightChartService } from '../services/weight-chart.service';


@Component({
    selector: 'weight-chart',
    templateUrl: './weight-chart.component.pug',
    styleUrls: ['./weight-chart.component.scss']
})
export class WeightChartComponent implements AfterViewInit, OnDestroy {
    @ViewChild(ChartComponent)
    chart: ChartComponent;
    constructor(private zone: NgZone,
        private fitApi: FitApiService,
        private chartService: WeightChartService) {
    }

    public onSubmit(): void {

    }

    public ngOnDestroy() {

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
            }
        }
    };
    public createDatasource() {
    }
    public createFatDatasource() {
        this.fitApi.createBodyFatDatasource()
            .subscribe(console.log, console.error);
    }

    // raw:com.google.body.fat.percentage:265564637760:Example Browser:Browser:1000002:PolarImport
    // raw:com.google.weight:265564637760:Example Browser:Browser:1000001:PolarImport
    public insertRandomWeights() {
        const list: { fat: number, timestamp: moment.Moment }[] = [];
        const start: number = moment().subtract(30, 'day').unix();
        const now: number = moment().unix();
        const windowSize: number = now - start;
        console.log('windowsize', windowSize, moment.unix(start), moment.unix(now));
        for (let i = 0; i < 100; i++) {
            const item: { fat: number, timestamp: moment.Moment } = {
                fat: Math.random() * 20 + 20,
                timestamp: moment.unix(start + Math.round(windowSize * Math.random()))
            };
            list.push(item);
        }
        console.log('createde items', list.length); /*
        this.fitApi.insertFatDataPoints('raw:com.google.body.fat.percentage:265564637760:Example Browser:Browser:1000002:PolarImport',
            list)
            .subscribe(console.log, console.error);*/
        this.fitApi.getDataSources(['com.google.body.fat.percentage', 'com.google.weight']).subscribe(console.log, console.error);
    }


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
            data: [
            ]
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
        this.zone.run(() => {
            this.chart.chart.update(); /*
            this.fitApi.getMergedWeights()
                .subscribe((dat: {
                    point: {
                        dataTypeName: string,
                        endTimeNanos: string,
                        modifiedTimeMillis: string,
                        originDataSourceId: string,
                        startTimeNanos: string,
                        value: { fpVal: number }[]
                    }[]
                }) => {
                    let lst: ChartPoint[] = [];
                    for (let p of dat.point) {

                        lst.push({
                            x: new Date(parseInt(p.startTimeNanos.substr(0, p.startTimeNanos.length - 6))),
                            y: p.value[0].fpVal
                        });
                    }
                    lst.sort((a: ChartPoint, b: ChartPoint) => {
                        const t1: Date = <any>a.x;
                        const t2: Date = <any>b.x;
                        return t1.valueOf() - t2.valueOf();
                    });
                    this.chart.chart.data.datasets[0].data = lst;
                    this.chart.chart.update(this.chart.chart.config.options);
                }, console.error);*/
            this.fitApi
                .getDataSources(['com.google.body.fat.percentage'])
                .pipe(flatMap((value: DataSourceListResponse) => {
                    const data: AggregateByFilter[] = [];
                    data.push({
                        dataTypeName: 'com.google.weight'
                    });
                    data.push({
                        dataTypeName: 'com.google.body.fat.percentage',
                        // dataSourceId: 'derived:com.google.body.fat.percentage.summary:com.google.android.gms:aggregated'
                    });
                    for (const info of value.dataSource) {
                        data.push({
                            dataSourceId: info.dataStreamId
                        });
                    }
                    return this.fitApi.getAggregateData(data, moment().subtract(90, 'days'), moment(), 1000 * 3600);
                }))
                .subscribe((data) => {
                    const weightDatapoints: ChartPoint[] = [];
                    const fatDatapoints: ChartPoint[] = [];
                    for (const bucket of data.bucket) {
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
                    this.chart.chart.data.datasets[0].data = weightDatapoints;
                    this.chart.chart.data.datasets[1].data = fatDatapoints;
                    this.chart.chart.update(this.chart.chart.config.options);
                });
            // this.fitApi.getMergedBodyFat();
        });
    }
}
