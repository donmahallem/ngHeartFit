import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatGridListModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
} from '@angular/material';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FitApiService } from '../service/fit-api.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BodyMetricsRoutingModule } from './bodymetrics-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BodyMetricsFormComponent } from './components/bodymetrics-form.component';
import { WeightChartComponent } from './components/weight-chart.component';
import { ChartComponent } from '../common-components/chart.component';

@NgModule({
    declarations: [
        BodyMetricsFormComponent,
        WeightChartComponent,
        ChartComponent
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
        MatDatepickerModule
    ],
    providers: [
        FitApiService,
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS }
    ]
})
export class BodyMetricsModule { }
