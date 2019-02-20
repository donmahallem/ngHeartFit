import {
    Component,
    OnInit
} from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors, FormBuilder } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material';
import * as moment from 'moment';
import { FitApiService, SubmitBodyMetricsRequest } from 'src/app/service/fit-api.service';
import { FitApiDataSourceService } from 'src/app/service/fit-data-source.service';


export function forbiddenNameValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const group: FormGroup = <any>control;
        const weightControl: FormControl = <FormControl>group.get('bodyweight');
        const fatControl: FormControl = <FormControl>group.get('bodyfat');
        const heightControl: FormControl = <FormControl>group.get('bodyheight');
        let groupErrors: ValidationErrors | null = group.errors;
        let controlValue = false;
        controlValue = controlValue || weightControl.value > 0;
        controlValue = controlValue || fatControl.value > 0;
        controlValue = controlValue || heightControl.value > 0;
        if (controlValue === true) {
            return null;
        }
        if (groupErrors === null || groupErrors === undefined) {
            groupErrors = {};
        }
        groupErrors['oneValueRequired'] = 'Atleast one value is required';
        return groupErrors;
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

    public static readonly FOOT_TO_METER: number = 0.3048;
    public static readonly INCH_TO_METER: number = 0.0254;
    public static readonly POUND_TO_KILOGRAM: number = 0.453592;
    public static readonly STONE_TO_KILOGRAM: number = 6.35029;
    public metricsForm: FormGroup;
    constructor(private fitApi: FitApiDataSourceService,
        private fb: FormBuilder) {
        this.metricsForm = this.fb
            .group({
                bodyweight: [0, Validators.min(0)],
                bodyfat: [0, [Validators.min(0), Validators.max(100)]],
                bodyheight: [0, Validators.min(0)],
                bodyweightunit: ['kilogram', Validators.required],
                bodyheightunit: ['meter', Validators.required],
                timestamp: [moment.utc().local(), Validators.required]
            })
        //this.metricsForm.setValidators(forbiddenNameValidator());
        this.metricsForm.valueChanges.subscribe(console.log);
        this.metricsForm.statusChanges.subscribe((stat) => {
            console.log(stat, this.metricsForm.errors, this.metricsForm.get('bodyfat').errors);
        });
    }

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
            this.submitData(submitObject);
        } else {
            console.log(this.metricsForm.errors);
        }
    }

    public submitData(data: SubmitBodyMetricsRequest): void {
        console.log(data);/*
        this.fitApi.submitBodyMetrics(submitObject)
        .subscribe(console.log, console.error);*/
    }
}
