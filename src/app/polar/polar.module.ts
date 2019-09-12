import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
    MatButtonModule,
    MatGridListModule,
    MatIconModule,
    MatSlideToggleModule,
    MatExpansionModule,
    MatProgressBar,
    MatProgressBarModule
} from '@angular/material';

import { PolarRoutingModule } from './polar-routing.module';
import { UploadComponent } from './upload/upload.component';
import { UploadDataService } from './services/upload-data.service';
import { ViewUploadComponent } from './view-upload/view-upload.component';
import { WeightChartComponent } from './view-upload/weight-chart.component';
import { UploadToFitComponent } from './view-upload/upload-to-fit.component';
import { HttpClientModule } from '@angular/common/http';
import { FilePreviewComponent } from './upload/file-preview.component';
import { AnalyzeDataService } from './services/analyze-data.service';
import { FileUploadErrorComponent } from './upload/file-upload-error.component';
import { FileUploadProgressComponent } from './upload/file-upload-progress.component';
import { FileUploadLoadedComponent } from './upload/file-upload-loaded.component';

@NgModule({
    declarations: [
        UploadComponent,
        ViewUploadComponent,
        WeightChartComponent,
        UploadToFitComponent,
        FilePreviewComponent,
        FileUploadErrorComponent,
        FileUploadProgressComponent,
        FileUploadLoadedComponent
    ],
    imports: [
        CommonModule,
        PolarRoutingModule,
        MatButtonModule,
        HttpClientModule,
        MatGridListModule,
        MatIconModule,
        MatSlideToggleModule,
        MatExpansionModule,
        MatProgressBarModule
    ],
    providers: [
        AnalyzeDataService
    ]
})
export class PolarModule { }
