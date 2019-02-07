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
    constructor(private zone: NgZone, private fitApi: FitApiService) {
        console.log("JJGJGJ")
    }

    public createDatasource() {
        this.fitApi.createWeightDatasource()
            .subscribe(console.log, console.error);
    }

    public insertRandomWeights() {
        let list: { weight: number, timestamp: moment.Moment }[] = [];
        const start: number = moment().subtract(30, 'day').unix();
        const now: number = moment().unix();
        const windowSize: number = now - start;
        console.log("windowsize", windowSize, moment.unix(start), moment.unix(now));
        for (let i = 0; i < 100; i++) {
            let item: { weight: number, timestamp: moment.Moment } = {
                weight: Math.random() * 20 + 60,
                timestamp: moment.unix(start + Math.round(windowSize * Math.random()))
            };
            list.push(item);
        }
        console.log("createde items", list.length);
        this.fitApi.insertWeightDataPoints('raw:com.google.weight:265564637760:Example Browser:Browser:1000001:PolarImport',
            list)
            .subscribe(console.log, console.error);
    }


    public ngAfterViewInit(): void {
        console.log("ngAfterViewInit called");
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
        this.zone.run(() => {
            console.log("JJJ");
            this.chart.chart.update();
            this.fitApi.getMergedWeights().subscribe(console.log, console.error);
        })
    }
}
