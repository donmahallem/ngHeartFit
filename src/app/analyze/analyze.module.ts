import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';

import { AnalyzeRoutingModule } from './analyze-routing.module';
import { UploadComponent } from './upload/upload.component';
import { UploadDataService } from './services/upload-data.service';
import { ViewUploadComponent } from './view-upload/view-upload.component';
import { WeightChartComponent } from './view-upload/weight-chart.component';

@NgModule({
    declarations: [
        UploadComponent,
        ViewUploadComponent,
        WeightChartComponent
    ],
    imports: [
        CommonModule,
        AnalyzeRoutingModule,
        MatButtonModule
    ],
    providers: [UploadDataService]
})
export class AnalyzeModule { }
