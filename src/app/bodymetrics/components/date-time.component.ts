import {
    Component,
    OnInit
} from '@angular/core';
import {
    FormGroup,
    Validators,
    ValidatorFn,
    AbstractControl,
    ValidationErrors,
    FormBuilder,
    ControlValueAccessor
} from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material';
import * as moment from 'moment';
import { FitApiService, SubmitBodyMetricsRequest } from 'src/app/service/fit-api.service';
import { FitApiDataSourceService } from 'src/app/service/fit-data-source.service';

@Component({
    selector: 'date-time-cmp',
    templateUrl: './date-time.component.pug',
    styleUrls: ['./date-time.component.scss']
})
export class DateTimeComponent implements ControlValueAccessor {

    private timestamp: moment.Moment = moment();

    constructor() {
    }

    writeValue(value: any): void {
        this.timestamp = value;
    }
    propagateChange = (_: any) => { };

    registerOnChange(fn: (_: any) => void): void {
        this.propagateChange = fn;
    }

    registerOnTouched(fn: any): void {

    }

    setDisabledState?(isDisabled: boolean): void;
}
