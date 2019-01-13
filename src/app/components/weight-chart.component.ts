import { Component, OnInit, NgZone, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { from } from 'rxjs';
import { mergeMap, filter, merge, map, toArray, take } from 'rxjs/operators';
import { fitness_v1 } from 'googleapis';
import * as moment from 'moment';
@Component({
    selector: 'weight-chart',
    templateUrl: './weight-chart.component.html',
    styleUrls: ['./weight-chart.component.scss']
})
export class WeightChartComponent implements OnInit, AfterViewInit {
    public user: any;
    private chart: Chart;
    @ViewChild('chart') mySpan: ElementRef;
    constructor() { }

    public ngAfterViewInit(): void {
        this.chart = new Chart(this.mySpan.nativeElement, {
            type: 'line',
            data: {
                datasets: [{
                    label: 'My First dataset',
                    data: [{ x: 2, y: 3 }, { x: 4, y: 5 }],
                    fill: false,
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }],

                    xAxes: [{
                        type: 'time',
                        time: {
                            unit: 'month'
                        }
                    }]
                }
            }
        });/*
        this.gapiService.getAggregateWeights()
            .pipe(mergeMap((resp) => {
                return from(resp.bucket);
            }), filter((bucket: fitness_v1.Schema$AggregateBucket) => {
                if (bucket.dataset && bucket.dataset.length >= 1) {
                    return true;
                }
                return false;
            }), mergeMap((bucket: fitness_v1.Schema$AggregateBucket) => {
                return from(bucket.dataset);
            }), filter((dataset: fitness_v1.Schema$Dataset) => {
                if (dataset.point && dataset.point.length >= 1) {
                    return true;
                }
                return false;
            }), map((dataset: fitness_v1.Schema$Dataset) => {
                const convertTime = (min: string, max: string) => {
                    return (parseInt(min.substr(0, min.length - 3)) + parseInt(max.substr(0, max.length - 3))) / 2
                };
                return {
                    timestamp: new Date(convertTime(dataset.point[0].startTimeNanos, dataset.point[0].endTimeNanos) / 1000),
                    min: dataset.point[0].value[2].fpVal,
                    avg: dataset.point[0].value[0].fpVal,
                    max: dataset.point[0].value[1].fpVal
                };
            }), map((dat) => {
                console.log(dat);
                return { x: dat.timestamp, y: dat.avg };
            }), take(10), toArray())
            .subscribe((res) => {
                this.chart.data.datasets[0].data = res;
                this.chart.update();
                console.log(res);
            }, (err) => console.error, () => { console.log("Complete loaded"); });*/
    }
    public ngOnInit(): void {
        /*
        */
    }
}
