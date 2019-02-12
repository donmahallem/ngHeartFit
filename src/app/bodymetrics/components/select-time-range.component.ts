import {
    Component,
    NgZone,
    AfterViewInit,
    ViewChild,
    OnDestroy
} from '@angular/core';
import { ChartComponent } from 'src/app/common-components/chart.component';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import * as moment from 'moment';
import { FitApiService, AggregateByFilter } from 'src/app/service/fit-api.service';
import { ChartPoint, ChartConfiguration } from 'chart.js';
import { flatMap } from 'rxjs/operators';
import { DataSourceListResponse } from 'src/app/service/fit-api-modals';
import { WeightChartService, Status } from '../services/weight-chart.service';
import { Subscription } from 'rxjs';


export function createCompareDateValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const group: FormGroup = <any>control;
        const values: {
            startdate: moment.Moment,
            enddate: moment.Moment
        } = group.value;
        if (values.startdate.isBefore(values.enddate)) {
            return null;
        }
        return {
            oneValueRequired: 'Atleast one value is required'
        };
    };
}

@Component({
    selector: 'select-time-range-cmp',
    templateUrl: './select-time-range.component.pug',
    styleUrls: ['./select-time-range.component.scss']
})
export class SelectTimeRangeComponent implements AfterViewInit,
    OnDestroy {
    private mSubscriptions: Subscription[] = [];
    public dateForm: FormGroup = new FormGroup({
        enddate: new FormControl(moment.utc().local(), Validators.required),
        startdate: new FormControl(moment.utc().subtract(7, 'days').local(), Validators.required)
    }, createCompareDateValidator());
    constructor(private chartService: WeightChartService) {
        this.chartService.combinedDateListener.subscribe(console.log);
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
