import { Component, OnInit, NgZone, ElementRef, AfterViewInit, ViewChild, Input, DoCheck, Directive } from '@angular/core';
import { Chart, ChartOptions, ChartConfiguration } from 'chart.js';
import { BehaviorSubject } from 'rxjs';
@Directive({
    selector: 'canvas[chartcmp]'
})
export class ChartComponent implements AfterViewInit {
    private mChart: Chart;
    private mChartConfiguration: ChartConfiguration;

    constructor(private elRef: ElementRef) { }


    @Input('chartConfiguration')
    public set chartConfiguration(opts: ChartConfiguration) {
        this.mChartConfiguration = opts;
    }

    public get chart(): Chart {
        return this.mChart;
    }

    public ngAfterViewInit(): void {
        this.mChart = new Chart(this.elRef.nativeElement, this.mChartConfiguration);
    }

}
