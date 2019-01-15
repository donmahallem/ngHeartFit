import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';

import { AnalyzeRoutingModule } from './analyze-routing.module';
import { UploadComponent } from './upload/upload.component';
import { UploadDataService } from './services/upload-data.service';
import { ViewUploadComponent } from './view-upload/view-upload.component';
import { WeightChartComponent } from './view-upload/weight-chart.component';
import { UploadToFitComponent } from './view-upload/upload-to-fit.component';
import { FitApiService } from '../service/fit-api.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [
        UploadComponent,
        ViewUploadComponent,
        WeightChartComponent,
        UploadToFitComponent
    ],
    imports: [
        CommonModule,
        AnalyzeRoutingModule,
        MatButtonModule,
        HttpClientModule
    ],
    providers: [UploadDataService,
        FitApiService]
})
export class AnalyzeModule { }
