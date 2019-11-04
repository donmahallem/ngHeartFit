/*!
 * Source https://github.com/donmahallem/ngHeartFit
 */

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
} from '@angular/material';
import { MomentDateAdapter, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { BaseInsertDialogComponent } from '../common-components/base-insert-dialog.component';
import { LineChartModule } from '../common-components/line-chart';
import { NgGapiConfigModule } from '../nggapi-config.module';
import { BodyMetricsRoutingModule } from './bodymetrics-routing.module';
import { BodyMetricsFormComponent } from './components/bodymetrics-form.component';
import { SelectTimeRangeComponent } from './components/select-time-range.component';
import { WeightChartComponent } from './components/weight-chart.component';
import { WeightChartService } from './services/weight-chart.service';

@NgModule({
    declarations: [
        BodyMetricsFormComponent,
        WeightChartComponent,
        SelectTimeRangeComponent,
        BaseInsertDialogComponent,
    ],
    imports: [
        CommonModule,
        BodyMetricsRoutingModule,
        MatButtonModule,
        HttpClientModule,
        MatGridListModule,
        MatIconModule,
        MatCheckboxModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        NgGapiConfigModule,
        FlexLayoutModule,
        MatDialogModule,
        LineChartModule,
    ],
    providers: [
        WeightChartService,
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    ],
})
export class BodyMetricsModule { }
