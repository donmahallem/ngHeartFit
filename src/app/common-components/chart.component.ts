import { Component, OnInit, NgZone, ElementRef, AfterViewInit, ViewChild, Input, DoCheck, Directive } from '@angular/core';
import { Chart } from 'chart.js';
import { BehaviorSubject } from 'rxjs';
@Directive({
    selector: 'canvas[chartcmp]'
})
export class ChartComponent implements AfterViewInit {
    private mChart: Chart;

    private mType = 'line';

    constructor(private elRef: ElementRef) { }

    @Input('chartType')
    public set chartType(type: string) {
        this.mType = type;
    }

    public get chartType(): string {
        return this.mType;
    }

    public get chart(): Chart {
        return this.mChart;
    }

    public ngAfterViewInit(): void {
        this.mChart = new Chart(this.elRef.nativeElement, {
            type: this.chartType
        });
    }

}
