import {
    Component,
    OnInit
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material';
import * as moment from 'moment';

@Component({
    selector: 'bodymetrics-form-cmp',
    templateUrl: './bodymetrics-form.component.pug',
    styleUrls: ['./bodymetrics-form.component.scss']
})
export class BodyMetricsFormComponent {
    private metricsForm: FormGroup = new FormGroup({
        bodyweight: new FormControl('', Validators.compose([Validators.min(0)])),
        bodyfat: new FormControl('', Validators.compose([Validators.min(0), Validators.max(100)])),
        bodyheight: new FormControl('', Validators.compose([Validators.min(0)])),
        bodyweightunit: new FormControl('kilogram'),
        bodyheightunit: new FormControl('meter'),
        date: new FormControl(moment.utc().local(), Validators.required),
        time: new FormControl(moment.utc().local().format("HH:mm"), Validators.pattern(/^(([0-1][0-9])|(2[0-3]))\:([0-5][0-9])/))
    });
    constructor() { }

    public onSubmit(): void {
        if (this.metricsForm.valid) {
            const bodyWeightUnit: string = this.metricsForm.get('bodyweightunit').value;
            const bodyHeightUnit: string = this.metricsForm.get('bodyheightunit').value;
            let bodyWeightMultiplicator: number = 1;
            if (bodyWeightUnit === "pound") {
                bodyWeightMultiplicator = 0.453592;
            } else if (bodyWeightUnit === "stone") {
                bodyWeightMultiplicator = 6.35029;
            }
            let bodyHeightMultiplicator: number = 1;
            if (bodyHeightUnit === "inch") {
                bodyHeightMultiplicator = 0.0254;
            } else if (bodyHeightUnit === "feet") {
                bodyHeightMultiplicator = 0.3048;
            }
            const bodyWeight: number = this.metricsForm.get('bodyweight').value * bodyWeightMultiplicator;
            const bodyHeight: number = this.metricsForm.get('bodyheight').value * bodyHeightMultiplicator;
            const date: moment.Moment = this.metricsForm.get('date').value;
            const time: string = this.metricsForm.get('time').value;
            const timeSplit: string[] = time.split(":");
            date.hours(parseInt(timeSplit[0]));
            date.minutes(parseInt(timeSplit[1]));
            console.log(bodyHeight, bodyWeight, date.toLocaleString());
        }
    }
    addEvent(type: string, event: MatDatepickerInputEvent<moment.Moment>) {
        console.log(event.value.utc());
    }

}
