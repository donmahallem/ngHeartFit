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

import { FitApiService } from '../service/fit-api.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BodyMetricsRoutingModule } from './bodymetrics-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BodyMetricsFormComponent } from './components/bodymetrics-form.component';

@NgModule({
    declarations: [
        BodyMetricsFormComponent
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
        MatSelectModule
    ],
    providers: [
        FitApiService
    ]
})
export class BodyMetricsModule { }
