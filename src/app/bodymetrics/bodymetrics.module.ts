import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatGridListModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule
} from '@angular/material';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { HttpClientModule } from '@angular/common/http';
import { BodyMetricsRoutingModule } from './bodymetrics-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BodyMetricsFormComponent } from './components/bodymetrics-form.component';
import { WeightChartComponent } from './components/weight-chart.component';
import { NgGapiConfigModule } from '../nggapi-config.module';
import { SelectTimeRangeComponent } from './components/select-time-range.component';
import { WeightChartService } from './services/weight-chart.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LineChartModule } from '../common-components/line-chart';
import { BaseInsertDialogComponent } from '../common-components/base-insert-dialog.component';

@NgModule({
    declarations: [
        BodyMetricsFormComponent,
        WeightChartComponent,
        SelectTimeRangeComponent,
        BaseInsertDialogComponent
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
        LineChartModule
    ],
    providers: [
        WeightChartService,
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS }
    ]
})
export class BodyMetricsModule { }
