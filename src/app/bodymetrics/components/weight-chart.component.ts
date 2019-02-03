import { Component, OnInit, NgZone, ElementRef, AfterViewInit, ViewChild, Input, DoCheck } from '@angular/core';
import { Chart } from 'chart.js';
import { BehaviorSubject } from 'rxjs';
import { ChartComponent } from 'src/app/common-components/chart.component';
@Component({
    selector: 'weight-chart',
    templateUrl: './weight-chart.component.pug',
    styleUrls: ['./weight-chart.component.scss']
})
export class WeightChartComponent {
    @ViewChild(ChartComponent)
    chart: ChartComponent;
    constructor(private zone: NgZone) { }


    public ngAfterViewInit(): void {
        this.chart.chart.config.options = {
        };
        this.chart.chart.data = {
            labels: ["asdf"],
            datasets: [{
                label: 'damnit',
                data: [
                    {
                        x: 19,
                        y: 29
                    }, {
                        x: 29,
                        y: 39
                    }, {
                        x: 39,
                        y: 19
                    }
                ]
            }]
        };
        this.chart.chart.update();
    }
}
