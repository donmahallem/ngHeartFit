import { Component, OnInit, NgZone, ElementRef, AfterViewInit, ViewChild, Input, DoCheck } from '@angular/core';
import { Chart } from 'chart.js';
import { from, BehaviorSubject } from 'rxjs';
import { mergeMap, filter, merge, map, toArray, take } from 'rxjs/operators';
import { fitness_v1 } from 'googleapis';
import * as moment from 'moment';
import { DataPoint } from './data-point';
@Component({
    selector: 'weight-chart',
    templateUrl: './weight-chart.component.pug',
    styleUrls: ['./weight-chart.component.scss']
})
export class WeightChartComponent implements OnInit, AfterViewInit {
    public user: any;
    private chart: Chart;
    @ViewChild('chart') mySpan: ElementRef;
    constructor() { }


    public ngAfterViewInit(): void {
        console.log("INIT");
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
                }, responsive: true
            }
        });
        console.log("Observe");
        this.chartDataSubject.asObservable().subscribe((data) => {
            if (data) {
                console.log(data);
                this.chart.data.datasets[0].data = data;
                this.chart.update();
            }
        });
    }

    private chartDataSubject: BehaviorSubject<DataPoint[]> = new BehaviorSubject<DataPoint[]>(null);
    @Input("chartData")
    public set chartData(data: DataPoint[]) {
        console.log("set data", data.length);
        let map: Map<string, number> = new Map<string, number>();;
        for (let point of data) {
            const key: string = new Date(point.x.getTime() / 1000).toUTCString();
            if (map[key])
                continue;
            map[key] = point;
        }
        let lst: DataPoint[] = [];
        for (let key of Object.keys(map)) {
            lst.push(map[key]);
        }
        this.chartDataSubject.next(lst);
    }

    public get chartData(): DataPoint[] {
        return this.chartDataSubject.getValue();
    }
    private _chartData: DataPoint[];
    public ngOnInit(): void {
        /*
        */
    }
}
