import { Component, OnInit, NgZone, ElementRef, AfterViewInit, ViewChild, Input, DoCheck } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as d3 from 'd3';
import { debounceTime } from 'rxjs/operators';
export interface DataPoint {
    x: Date;
    y: number;
}
@Component({
    selector: 'app-line-chart',
    templateUrl: './line-chart.component.pug',
    styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit, AfterViewInit {
    constructor(private zone: NgZone,
        private elRef: ElementRef) {
        this.init();
    }
    @Input('chartData')
    public set chartData(data: DataPoint[]) {
        this.chartDataSubject.next(data);
    }

    public get chartData(): DataPoint[] {
        return this.chartDataSubject.getValue();
    }
    public user: any;
    @ViewChild('chart', { static: false }) mySpan: ElementRef;

    private chartDataSubject: BehaviorSubject<DataPoint[]> = new BehaviorSubject<DataPoint[]>(null);
    private _chartData: DataPoint[];

    private xScale: d3.ScaleTime<number, number>;
    private yScale: d3.ScaleLinear<number, number>;
    private line: d3.Line<DataPoint>;

    public readonly margin = { top: 20, right: 20, bottom: 30, left: 50 };
    public data: any[];
    public chartContainer: any;
    public chartPath: any;
    public xAxis: any;
    public yAxis: any;
    private resizeSubject: BehaviorSubject<{ width: number, height: number }> = new BehaviorSubject<{ width: number, height: number }>({ width: 1, height: 1 });
    public init(): void {
        this.xScale = d3.scaleUtc()
            .domain([0, 125]) // input
            .range([0, 700]); // output

        // 6. Y scale will use the randomly generate number
        this.yScale = d3.scaleLinear()
            .domain([0, 1]) // input
            .range([300 - this.margin.top - this.margin.bottom, 0]); // output

        // 7. d3's line generator
        this.line = d3.line<DataPoint>()
            .x((d, i) => this.xScale(d.x)) // set the x values for the line generator
            .y((d) => this.yScale(d.y)) // set the y values for the line generator
            .curve(d3.curveMonotoneX);
        this.resizeSubject.pipe(debounceTime(100)).subscribe((value) => {
            const innerWidth: number = value.width - this.margin.left - this.margin.right;
            const innerHeight: number = value.height - this.margin.top - this.margin.bottom;
            this.xScale
                .range([0, innerWidth]);
            this.yScale
                .range([innerHeight, 0]);
            this.xAxis
                .call(d3.axisBottom(this.xScale))
                .attr('transform', 'translate(0,' + (innerHeight) + ')');
            this.yAxis
                .call(d3.axisLeft(this.yScale));
            this.chartPath
                .attr('d', this.line);
        });
    }
    public ngAfterViewInit(): void {
        this.resizeSubject.next({
            height: this.elRef.nativeElement.offsetHeight,
            width: this.elRef.nativeElement.offsetWidth,
        });
        const dataset = d3.range(0).map(function (d) { return { x: new Date(d), 'y': d3.randomUniform(1)() }; });
        const container = d3.select(this.mySpan.nativeElement).append('g')
            .attr('transform',
                'translate(' + this.margin.left + ',' + this.margin.top + ')'
            );
        this.chartContainer = container.append('g');
        this.chartPath = this.chartContainer
            .append('path');
        this.xScale.domain(d3.extent(dataset, (d) => d.x));
        this.yScale.domain(d3.extent(dataset, (d) => d.y));
        this.chartPath
            .datum(dataset) // 10. Binds data to the line
            .attr('class', 'line') // Assign a class for styling
            .attr('d', this.line)
            .attr('stroke', 'black')
            .attr('stroke-width', '2')
            .attr('fill', '#00000000')
            .attr('fill-opacity', 0);
        this.xAxis = container.append('g')
            .attr('transform', 'translate(0,' + (300 - this.margin.top - this.margin.bottom) + ')')
            .call(d3.axisBottom(this.xScale)
                .tickFormat(d3.timeFormat('%Y-%m-%d HH:MM')));
        this.yAxis = container.append('g')
            .call(d3.axisLeft(this.yScale));
        const yAxisText = this.yAxis
            .append('text')
            .attr('fill', '#000')
            .attr('transform', 'rotate(-90)')
            .attr('y', 6)
            .attr('dy', '0.71em')
            .attr('text-anchor', 'end')
            .text('Heartrate (BPM)');
        this.chartDataSubject.asObservable().subscribe((data) => {
            if (data) {
                this.zone.run(() => {
                    this.data = data;
                    this.xScale.domain(d3.extent(data, (d) => d.x));
                    this.yScale.domain(d3.extent(data, (d) => d.y));
                    this.yAxis
                        .call(d3.axisLeft(this.yScale));
                    this.xAxis
                        .call(d3.axisBottom(this.xScale).tickFormat(d3.timeFormat('%Y-%m-%d %H:%M')));
                    this.chartPath.datum(data)
                        .attr('d', this.line);
                });
            }
        });
    }

    public onResize(ev: any) {
        this.resizeSubject.next({
            height: this.elRef.nativeElement.offsetHeight,
            width: this.elRef.nativeElement.offsetWidth,
        });
    }
    public ngOnInit(): void {
        /*
        */
    }
}
