import { Component, OnInit, NgZone, ElementRef, AfterViewInit, ViewChild, Input, DoCheck } from '@angular/core';
import { Chart } from 'chart.js';
import { BehaviorSubject } from 'rxjs';
import { DataPoint } from './data-point';
@Component({
    selector: 'weight-chart',
    templateUrl: './weight-chart.component.pug',
    styleUrls: ['./weight-chart.component.scss']
})
export class WeightChartComponent implements OnInit, AfterViewInit {
    constructor(private zone: NgZone) { }
    @Input('chartData')
    public set chartData(data: DataPoint[]) {
        const map: Map<string, number> = new Map<string, number>();
        for (const point of data) {
            const key: string = new Date(point.x.getTime() / 1000).toUTCString();
            if (map[key]) {
                continue;
            }
            map[key] = point;
        }
        const lst: DataPoint[] = [];
        for (const key of Object.keys(map)) {
            lst.push(map[key]);
        }
        this.chartDataSubject.next(lst);
    }

    public get chartData(): DataPoint[] {
        return this.chartDataSubject.getValue();
    }
    public user: any;
    private chart: Chart;
    @ViewChild('chart') mySpan: ElementRef;

    private chartDataSubject: BehaviorSubject<DataPoint[]> = new BehaviorSubject<DataPoint[]>(null);
    private _chartData: DataPoint[];


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
                    }]
                }, responsive: true
            }
        });
        this.chartDataSubject.asObservable().subscribe((data) => {
            if (data) {
                this.chart.data.datasets[0].data = data;
                this.zone.run(() => {
                    this.chart.update();
                });
            }
        });
    }
    public ngOnInit(): void {
        /*
        */
    }
}
