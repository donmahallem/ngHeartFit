/*!
 * Source https://github.com/donmahallem/ngHeartFit
 */

import {
    AfterViewInit,
    Component,
    OnDestroy,
} from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { Status, WeightChartService } from '../services/weight-chart.service';

export const createCompareDateValidator: () => ValidatorFn = () =>
    (control: AbstractControl): { [key: string]: any } | undefined => {
        const group: FormGroup = control as any;
        const values: {
            startdate: moment.Moment,
            enddate: moment.Moment,
        } = group.value;
        if (values.startdate.isBefore(values.enddate)) {
            return undefined;
        }
        return {
            oneValueRequired: 'Atleast one value is required',
        };
    };

@Component({
    selector: 'app-select-time-range',
    styleUrls: ['./select-time-range.component.scss'],
    templateUrl: './select-time-range.component.pug',
})
export class SelectTimeRangeComponent implements AfterViewInit,
    OnDestroy {
    public dateForm: FormGroup = new FormGroup({
        enddate: new FormControl(moment.utc().local(), Validators.required),
        startdate: new FormControl(moment.utc().subtract(31, 'days').local(), Validators.required),
    }, createCompareDateValidator());
    private mSubscriptions: Subscription[] = [];
    constructor(private chartService: WeightChartService) {
    }

    public onSubmit(): void {
        this.chartService.startTime = this.dateForm.value.startdate;
        this.chartService.endTime = this.dateForm.value.enddate;
    }

    public enableInputs(enabled: boolean): void {
        if (enabled) {
            this.dateForm.get('enddate').enable();
            this.dateForm.get('startdate').enable();
        } else {
            this.dateForm.get('enddate').disable();
            this.dateForm.get('startdate').disable();
        }
    }
    public ngAfterViewInit(): void {
        this.mSubscriptions
            .push(this.chartService.statusObservable.
                subscribe((status: Status) => {
                    switch (status) {
                        case Status.LOADING:
                            this.enableInputs(false);
                            break;
                        default:
                            this.enableInputs(true);
                            break;
                    }
                }));
    }

    public ngOnDestroy(): void {
        for (const sub of this.mSubscriptions) {
            sub.unsubscribe();
        }
        this.mSubscriptions = [];
    }
}
