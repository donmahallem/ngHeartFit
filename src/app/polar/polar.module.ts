/*!
 * Source https://github.com/donmahallem/ngHeartFit
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { HttpClientModule } from '@angular/common/http';
import { FileUploadModule } from '../modules';
import { PolarRoutingModule } from './polar-routing.module';
import { AnalyzeDataService } from './services/analyze-data.service';
import { SleepDayComponent } from './sleep/sleep-day.component';
import { SleepComponent } from './sleep/sleep.component';
import { SleepReportResolver } from './sleep/sleep.resolver';
import { ViewSleepComponent } from './sleep/view-sleep.component';
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
        SleepComponent,
        ViewSleepComponent,
        SleepDayComponent,
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
        FileUploadModule,
    ],
    providers: [
        AnalyzeDataService,
        SleepReportResolver,
    ],
})
export class PolarModule { }
