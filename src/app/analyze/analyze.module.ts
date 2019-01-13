import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';

import { AnalyzeRoutingModule } from './analyze-routing.module';
import { UploadComponent } from './upload/upload.component';
import { UploadDataService } from './services/upload-data.service';

@NgModule({
    declarations: [
        UploadComponent
    ],
    imports: [
        CommonModule,
        AnalyzeRoutingModule,
        MatButtonModule
    ],
    providers: [UploadDataService]
})
export class AnalyzeModule { }
