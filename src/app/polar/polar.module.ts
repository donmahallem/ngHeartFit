import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatCheckboxModule, MatGridListModule, MatIconModule } from '@angular/material';

import { PolarRoutingModule } from './polar-routing.module';
import { UploadComponent } from './upload/upload.component';
import { UploadDataService } from './services/upload-data.service';
import { ViewUploadComponent } from './view-upload/view-upload.component';
import { WeightChartComponent } from './view-upload/weight-chart.component';
import { UploadToFitComponent } from './view-upload/upload-to-fit.component';
import { FitApiService } from '../service/fit-api.service';
import { HttpClientModule } from '@angular/common/http';
import { FilePreviewComponent } from './upload/file-preview.component';
import { AnalyzeDataService } from './services/analyze-data.service';

@NgModule({
    declarations: [
        UploadComponent,
        ViewUploadComponent,
        WeightChartComponent,
        UploadToFitComponent,
        FilePreviewComponent
    ],
    imports: [
        CommonModule,
        PolarRoutingModule,
        MatButtonModule,
        HttpClientModule,
        MatGridListModule,
        MatIconModule,
        MatCheckboxModule
    ],
    providers: [
        UploadDataService,
        FitApiService,
        AnalyzeDataService
    ]
})
export class PolarModule { }
