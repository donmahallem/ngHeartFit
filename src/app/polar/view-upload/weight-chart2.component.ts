import { Component, OnInit, NgZone, ElementRef, AfterViewInit, ViewChild, Input, DoCheck } from '@angular/core';
import { Chart } from 'chart.js';
import { BehaviorSubject } from 'rxjs';
import { DataPoint } from './data-point';
import * as d3 from "d3";
@Component({
    selector: 'weight-chart',
    templateUrl: './weight-chart2.component.pug',
    styleUrls: ['./weight-chart2.component.scss']
})
export class WeightChartComponent implements OnInit, AfterViewInit {
    constructor(private zone: NgZone) {
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
    private chart: Chart;
    @ViewChild('chart') mySpan: ElementRef;

    private chartDataSubject: BehaviorSubject<DataPoint[]> = new BehaviorSubject<DataPoint[]>(null);
    private _chartData: DataPoint[];

    private xScale: d3.ScaleTime<number, number>;
    private yScale: d3.ScaleLinear<number, number>;
    private line: d3.Line<DataPoint>;
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
            .curve(d3.curveMonotoneX)
    }

    public readonly margin = { top: 20, right: 20, bottom: 30, left: 50 };
    public data: any[];
    public chartContainer: any;
    public chartPath: any;
    public xAxis: any;
    public yAxis: any;
    public ngAfterViewInit(): void {
        var dataset = d3.range(10).map(function (d) { return { x: new Date(d), "y": d3.randomUniform(1)() } })
        const container = d3.select(this.mySpan.nativeElement).append("g")
            .attr("transform",
                "translate(" + this.margin.left + "," + this.margin.top + ")"
            );
        this.chartContainer = container.append('g');
        this.chartPath = this.chartContainer
            .append("path")
        this.xScale.domain(d3.extent(dataset, (d) => d.x));
        this.yScale.domain(d3.extent(dataset, (d) => d.y));
        this.chartPath
            .datum(dataset) // 10. Binds data to the line 
            .attr("class", "line") // Assign a class for styling 
            .attr("d", this.line)
            .attr("stroke", 'black')
            .attr("stroke-width", "2")
            .attr('fill', 'red');
        this.xAxis = container.append("g")
            .attr("transform", "translate(0," + (300 - this.margin.top - this.margin.bottom) + ")")
            .call(d3.axisBottom(this.xScale));
        this.yAxis = container.append("g")
            .call(d3.axisLeft(this.yScale))
        const yAxisText = this.yAxis
            .append("text")
            .attr("fill", "#000")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", "0.71em")
            .attr("text-anchor", "end")
            .text("Price ($)");
        this.chartDataSubject.asObservable().subscribe((data) => {
            if (data) {
                this.zone.run(() => {
                    console.log("DATAAA", data.length);
                    this.data = data;
                    this.xScale.domain(d3.extent(data, (d) => d.x));
                    this.yScale.domain(d3.extent(data, (d) => d.y));
                    this.yAxis
                        .call(d3.axisLeft(this.yScale))
                    this.xAxis
                        .call(d3.axisBottom(this.xScale))
                    this.chartPath.datum(data)
                        .attr("d", this.line);
                });
            }
        });
    }
    public ngOnInit(): void {
        /*
        */
    }
}
