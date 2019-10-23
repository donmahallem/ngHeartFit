import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
    MatButtonModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatProgressBarModule,
    MatSlideToggleModule,
} from '@angular/material';

import { HttpClientModule } from '@angular/common/http';
import { PolarRoutingModule } from './polar-routing.module';
import { AnalyzeDataService } from './services/analyze-data.service';
import { FilePreviewComponent } from './upload/file-preview.component';
import { FileUploadErrorComponent } from './upload/file-upload-error.component';
import { FileUploadLoadedComponent } from './upload/file-upload-loaded.component';
import { FileUploadProgressComponent } from './upload/file-upload-progress.component';
import { UploadComponent } from './upload/upload.component';
import { UploadToFitComponent } from './view-upload/upload-to-fit.component';
import { ViewUploadComponent } from './view-upload/view-upload.component';
import { WeightChartComponent } from './view-upload/weight-chart.component';

@NgModule({
    declarations: [
        UploadComponent,
        ViewUploadComponent,
        WeightChartComponent,
        UploadToFitComponent,
        FilePreviewComponent,
        FileUploadErrorComponent,
        FileUploadProgressComponent,
        FileUploadLoadedComponent,
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
        MatProgressBarModule,
    ],
    providers: [
        AnalyzeDataService,
    ],
})
export class PolarModule { }
