import {
    Component,
    OnInit
} from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material';
import * as moment from 'moment';
import { GapiService, SubmitBodyMetricsRequest } from 'src/app/service/gapi.service';


export function forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const group: FormGroup = <any>control;
        const weightControl: FormControl = <FormControl>group.get('bodyweight');
        const fatControl: FormControl = <FormControl>group.get('bodyfat');
        const heightControl: FormControl = <FormControl>group.get('bodyheight');
        let controlValue = false;
        controlValue = controlValue || (weightControl.valid && weightControl.value > 0);
        controlValue = controlValue || (fatControl.valid && fatControl.value > 0);
        controlValue = controlValue || (heightControl.valid && heightControl.value > 0);
        if (controlValue) {
            return null;
        }
        return {
            oneValueRequired: "Atleast one value is required"
        }
    };
}
export interface BodyMetricsFormData {
    bodyweight: number,
    bodyfat: number,
    bodyheight: number,
    bodyweightunit: string | 'stone' | 'kg',
    bodyheightunit: string | 'meter' | 'foot' | 'inch',
    date: moment.Moment,
    time: string
}
@Component({
    selector: 'bodymetrics-form-cmp',
    templateUrl: './bodymetrics-form.component.pug',
    styleUrls: ['./bodymetrics-form.component.scss']
})
export class BodyMetricsFormComponent {
    public metricsForm: FormGroup = new FormGroup({
        bodyweight: new FormControl(0, Validators.compose([Validators.min(0)])),
        bodyfat: new FormControl(0, Validators.compose([Validators.min(0), Validators.max(100)])),
        bodyheight: new FormControl(0, Validators.compose([Validators.min(0)])),
        bodyweightunit: new FormControl('kilogram'),
        bodyheightunit: new FormControl('meter'),
        date: new FormControl(moment.utc().local(), Validators.required),
        time: new FormControl(moment.utc().local().format("HH:mm"), Validators.pattern(/^(([0-1][0-9])|(2[0-3]))\:([0-5][0-9])/))
    }, forbiddenNameValidator(/.*/));
    constructor(private gapi: GapiService) { }

    public onSubmit(): void {
        if (this.metricsForm.valid === true) {
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
            const date: moment.Moment = this.metricsForm.get('date').value;
            const time: string = this.metricsForm.get('time').value;
            const timeSplit: string[] = time.split(":");
            date.hours(parseInt(timeSplit[0]));
            date.minutes(parseInt(timeSplit[1]));
            let submitObject: SubmitBodyMetricsRequest = {
                timestamp: date.unix()
            };
            submitObject.bodyweight = this.metricsForm.get('bodyweight').value * bodyWeightMultiplicator;
            submitObject.bodyheight = this.metricsForm.get('bodyheight').value * bodyHeightMultiplicator;
            submitObject.bodyfat = this.metricsForm.get('bodyfat').value * 1;

            this.gapi.submitBodyMetrics(submitObject)
                .subscribe(console.log, console.error);
        }
    }

}
