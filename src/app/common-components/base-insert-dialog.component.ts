import {
    Component,
    OnInit,
    Inject
} from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as moment from 'moment';
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
    styleUrls: ['./base-insert-dialog.component.scss']
})
export class BaseInsertDialogComponent {

    public static readonly FOOT_TO_METER: number = 0.3048;
    public static readonly INCH_TO_METER: number = 0.0254;
    public static readonly POUND_TO_KILOGRAM: number = 0.453592;
    public static readonly STONE_TO_KILOGRAM: number = 6.35029;
    public metricsForm: FormGroup;
    constructor(private fitApi: FitApiDataSourceService,
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<BaseInsertDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogParameter) {
        this.metricsForm = this.fb
            .group({
                value: [0, [Validators.min(0), Validators.max(100)]],
                unit: [0, Validators.required],
                date: [moment.utc().local(), Validators.required],
                time: ['12:12', Validators.required]
            });
    }

    private mSelectableUnits: SelectableUnit[] = [];
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

}
