/*!
 * Source https://github.com/donmahallem/ngHeartFit
 */

import {
    Component,
    Inject,
} from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators, ValidatorFn } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as moment from 'moment';
import { FitApiDataSourceService } from 'src/app/service/fit-data-source.service';

export function forbiddenNameValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const group: FormGroup = control as any;
        const weightControl: FormControl = group.get('bodyweight') as FormControl;
        const fatControl: FormControl = group.get('bodyfat') as FormControl;
        const heightControl: FormControl = group.get('bodyheight') as FormControl;
        let groupErrors: ValidationErrors | null = group.errors;
        let controlValue = false;
        controlValue = controlValue || weightControl.value > 0;
        controlValue = controlValue || fatControl.value > 0;
        controlValue = controlValue || heightControl.value > 0;
        if (controlValue) {
            return null;
        }
        if (groupErrors === null || groupErrors === undefined) {
            groupErrors = {};
        }
        groupErrors.oneValueRequired = 'Atleast one value is required';
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
export interface DialogParameter {
    selectableUnits?: SelectableUnit[];
    minValue?: number;
    maxValue?: number;
    title: string;
}

export interface SelectableUnit {
    key: string;
    value: string;
}
@Component({
    templateUrl: './base-insert-dialog.component.pug',
    styleUrls: ['./base-insert-dialog.component.scss'],
})
export class BaseInsertDialogComponent {
    public get selectableUnits(): SelectableUnit[] {
        return this.mSelectableUnits;
    }

    public set selectableUnits(units: SelectableUnit[]) {
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

    private mSelectableUnits: SelectableUnit[] = [];
    constructor(private fitApi: FitApiDataSourceService,
                private fb: FormBuilder,
                private dialogRef: MatDialogRef<BaseInsertDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: DialogParameter) {
        this.metricsForm = this.fb
            .group({
                value: [0, [Validators.min(0), Validators.max(100)]],
                unit: [0, Validators.required],
                date: [moment.utc().local(), Validators.required],
                time: ['12:12', Validators.required],
            });
    }

}
