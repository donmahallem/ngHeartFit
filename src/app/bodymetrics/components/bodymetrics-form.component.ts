import {
    Component,
    OnInit
} from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material';
import * as moment from 'moment';
import { FitApiService, SubmitBodyMetricsRequest } from 'src/app/service/fit-api.service';


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
            oneValueRequired: 'Atleast one value is required'
        };
    };
}
export interface BodyMetricsFormData {
    bodyweight: number;
    bodyfat: number;
    bodyheight: number;
    bodyweightunit: string | 'stone' | 'kg';
    bodyheightunit: string | 'meter' | 'foot' | 'inch';
    date: moment.Moment;
    time: string;
}
@Component({
    selector: 'bodymetrics-form-cmp',
    templateUrl: './bodymetrics-form.component.pug',
    styleUrls: ['./bodymetrics-form.component.scss']
})
export class BodyMetricsFormComponent {
    constructor(private fitApi: FitApiService) { }

    public static readonly FOOT_TO_METER: number = 0.3048;
    public static readonly INCH_TO_METER: number = 0.0254;
    public static readonly POUND_TO_KILOGRAM: number = 0.453592;
    public static readonly STONE_TO_KILOGRAM: number = 6.35029;
    public metricsForm: FormGroup = new FormGroup({
        bodyweight: new FormControl(0, Validators.compose([Validators.min(0)])),
        bodyfat: new FormControl(0, Validators.compose([Validators.min(0), Validators.max(100)])),
        bodyheight: new FormControl(0, Validators.compose([Validators.min(0)])),
        bodyweightunit: new FormControl('kilogram'),
        bodyheightunit: new FormControl('meter'),
        date: new FormControl(moment.utc().local(), Validators.required),
        time: new FormControl(moment.utc().local().format('HH:mm'), Validators.pattern(/^(([0-1][0-9])|(2[0-3]))\:([0-5][0-9])/))
    }, forbiddenNameValidator(/.*/));

    public onSubmit(): void {
        if (this.metricsForm.valid === true) {
            const bodyWeightUnit: string = this.metricsForm.get('bodyweightunit').value;
            const bodyHeightUnit: string = this.metricsForm.get('bodyheightunit').value;
            let bodyWeightMultiplicator = 1;
            if (bodyWeightUnit === 'pound') {
                bodyWeightMultiplicator = BodyMetricsFormComponent.POUND_TO_KILOGRAM;
            } else if (bodyWeightUnit === 'stone') {
                bodyWeightMultiplicator = BodyMetricsFormComponent.STONE_TO_KILOGRAM;
            }
            let bodyHeightMultiplicator = 1;
            if (bodyHeightUnit === 'inch') {
                bodyHeightMultiplicator = BodyMetricsFormComponent.INCH_TO_METER;
            } else if (bodyHeightUnit === 'foot') {
                bodyHeightMultiplicator = BodyMetricsFormComponent.FOOT_TO_METER;
            }
            const date: moment.Moment = this.metricsForm.get('date').value;
            const time: string = this.metricsForm.get('time').value;
            const timeSplit: string[] = time.split(':');
            date.hours(parseInt(timeSplit[0]));
            date.minutes(parseInt(timeSplit[1]));
            const submitObject: SubmitBodyMetricsRequest = {
                timestamp: date.unix()
            };
            submitObject.bodyweight = this.metricsForm.get('bodyweight').value * bodyWeightMultiplicator;
            submitObject.bodyheight = this.metricsForm.get('bodyheight').value * bodyHeightMultiplicator;
            submitObject.bodyfat = this.metricsForm.get('bodyfat').value * 1;

            this.fitApi.submitBodyMetrics(submitObject)
                .subscribe(console.log, console.error);
        }
    }

}
