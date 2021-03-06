/*!
 * Source https://github.com/donmahallem/ngHeartFit
 */

import {
    Component,
} from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators, ValidatorFn } from '@angular/forms';
import * as moment from 'moment';

export const forbiddenNameValidator: () => ValidatorFn = () =>
    (control: AbstractControl): { [key: string]: any } | undefined => {
        const group: FormGroup = control as any;
        const weightControl: FormControl = group.get('bodyweight') as FormControl;
        const fatControl: FormControl = group.get('bodyfat') as FormControl;
        const heightControl: FormControl = group.get('bodyheight') as FormControl;
        let groupErrors: ValidationErrors | undefined = group.errors;
        let controlValue = false;
        controlValue = controlValue || weightControl.value > 0;
        controlValue = controlValue || fatControl.value > 0;
        controlValue = controlValue || heightControl.value > 0;
        if (controlValue) {
            return undefined;
        }
        if (groupErrors === undefined || groupErrors === undefined) {
            groupErrors = {};
        }
        groupErrors.oneValueRequired = 'Atleast one value is required';
        return groupErrors;
    };
export interface IBodyMetricsFormData {
    bodyweight: number;
    bodyfat: number;
    bodyheight: number;
    bodyweightunit: string | 'stone' | 'kg';
    bodyheightunit: string | 'meter' | 'foot' | 'inch';
    date: moment.Moment;
    time: string;
}
@Component({
    selector: 'app-bodymetrics-form',
    styleUrls: ['./bodymetrics-form.component.scss'],
    templateUrl: './bodymetrics-form.component.pug',
})
export class BodyMetricsFormComponent {

    public static readonly FOOT_TO_METER: number = 0.3048;
    public static readonly INCH_TO_METER: number = 0.0254;
    public static readonly POUND_TO_KILOGRAM: number = 0.453592;
    public static readonly STONE_TO_KILOGRAM: number = 6.35029;
    public metricsForm: FormGroup;
    constructor(private fb: FormBuilder) {
        this.metricsForm = this.fb
            .group({
                bodyfat: [0, [Validators.min(0), Validators.max(100)]],
                bodyheight: [0, Validators.min(0)],
                bodyheightunit: ['meter', Validators.required],
                bodyweight: [0, Validators.min(0)],
                bodyweightunit: ['kilogram', Validators.required],
                date: [moment.utc().local(), Validators.required],
                time: ['12:12', Validators.required],
            });
    }

    public onSubmit(): void {
        if (this.metricsForm.valid) {
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
            const timestamp: moment.Moment = this.metricsForm.get('date').value;
            const timeString: string = this.metricsForm.get('time').value;
            const timeSplit: string[] = timeString.split(':').map((val) => val.trim());
            timestamp.hours(parseInt(timeSplit[0], 10));
            timestamp.minutes(parseInt(timeSplit[1], 10));
            const submitObject: any = {
                timestamp: timestamp.unix(),
            };
            submitObject.bodyweight = this.metricsForm.get('bodyweight').value * bodyWeightMultiplicator;
            submitObject.bodyheight = this.metricsForm.get('bodyheight').value * bodyHeightMultiplicator;
            submitObject.bodyfat = this.metricsForm.get('bodyfat').value * 1;
            this.submitData(submitObject);
        } else {
            // console.log(this.metricsForm.errors);
        }
    }

    public submitData(data: any): void {
        /*
        this.fitApi.submitBodyMetrics(submitObject)
        .subscribe(console.log, console.error);*/
    }
}
