import {
    Component,
    NgZone,
    AfterViewInit,
    ViewChild
} from '@angular/core';
import { ChartComponent } from 'src/app/common-components/chart.component';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import * as moment from 'moment';
import { FitApiService } from 'src/app/service/fit-api.service';


export function createCompareDateValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const group: FormGroup = <any>control;
        const values: {
            startdate: moment.Moment,
            enddate: moment.Moment
        } = group.value;
        if (values.startdate.isBefore(values.enddate)) {
            return null;
        }
        return {
            oneValueRequired: "Atleast one value is required"
        }
    };
}
@Component({
    selector: 'weight-chart',
    templateUrl: './weight-chart.component.pug',
    styleUrls: ['./weight-chart.component.scss']
})
export class WeightChartComponent implements AfterViewInit {
    @ViewChild(ChartComponent)
    chart: ChartComponent;
    public metricsForm: FormGroup = new FormGroup({
        enddate: new FormControl(moment.utc().local(), Validators.required),
        startdate: new FormControl(moment.utc().subtract(7, "days").local(), Validators.required)
    }, createCompareDateValidator());
    constructor(private zone: NgZone, private fitApi: FitApiService) { console.log("JJGJGJ") }


    public ngAfterViewInit(): void {
        console.log("Initiated");
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
        console.log("start");
        this.fitApi.getAllDataSources().subscribe(console.log, console.error);
    }
}
