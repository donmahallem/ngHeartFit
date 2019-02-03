import {
    Component,
    NgZone,
    AfterViewInit,
    ViewChild
} from '@angular/core';
import { ChartComponent } from 'src/app/common-components/chart.component';
@Component({
    selector: 'weight-chart',
    templateUrl: './weight-chart.component.pug',
    styleUrls: ['./weight-chart.component.scss']
})
export class WeightChartComponent implements AfterViewInit {
    @ViewChild(ChartComponent)
    chart: ChartComponent;
    constructor(private zone: NgZone) { }


    public ngAfterViewInit(): void {
        this.chart.chart.data = {
            labels: ["Weight in kg"],
            datasets: [{
                label: 'Weight',
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
                    }, {
                        x: 61,
                        y: 98
                    }
                ]
            }]
        };
        this.chart.chart.update();
    }
}
