/*!
 * Source https://github.com/donmahallem/ngHeartFit
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FileUploadComponent } from './components/file-upload.component';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        FileUploadComponent,
    ],
    exports: [
        FileUploadComponent,
    ],
})
export class FileUploadModule { }
