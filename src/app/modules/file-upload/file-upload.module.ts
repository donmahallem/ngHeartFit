/*!
 * Source https://github.com/donmahallem/ngHeartFit
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FileUploadComponent } from './components/file-upload.component';

@NgModule({
    declarations: [
        FileUploadComponent,
    ],
    exports: [
        FileUploadComponent,
    ],
    imports: [
        CommonModule,
    ],
})
export class FileUploadModule { }
