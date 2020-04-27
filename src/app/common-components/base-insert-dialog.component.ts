/*!
 * Source https://github.com/donmahallem/ngHeartFit
 */

import {
    Component,
    Inject,
} from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators, ValidatorFn } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
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
export interface IDialogParameter {
    selectableUnits?: ISelectableUnit[];
    minValue?: number;
    maxValue?: number;
    title: string;
}

export interface ISelectableUnit {
    key: string;
    value: string;
}
@Component({
    styleUrls: ['./base-insert-dialog.component.scss'],
    templateUrl: './base-insert-dialog.component.pug',
})
export class BaseInsertDialogComponent {
    public get selectableUnits(): ISelectableUnit[] {
        return this.mSelectableUnits;
    }

    public set selectableUnits(units: ISelectableUnit[]) {
        if (Array.isArray(units)) {
            this.mSelectableUnits = units;
        }
        this.mSelectableUnits = [];
    }

    public get hasSelectableUnits(): boolean {
        return this.mSelectableUnits.length > 0;
    }

    public static readonly FOOT_TO_METER: number = 0.3048;
    public static readonly INCH_TO_METER: number = 0.0254;
    public static readonly POUND_TO_KILOGRAM: number = 0.453592;
    public static readonly STONE_TO_KILOGRAM: number = 6.35029;
    public metricsForm: FormGroup;

    private mSelectableUnits: ISelectableUnit[] = [];
    constructor(private fb: FormBuilder,
                @Inject(MAT_DIALOG_DATA) public data: IDialogParameter) {
        this.metricsForm = this.fb
            .group({
                date: [moment.utc().local(), Validators.required],
                time: ['12:12', Validators.required],
                unit: [0, Validators.required],
                value: [0, [Validators.min(0), Validators.max(100)]],
            });
    }

}
