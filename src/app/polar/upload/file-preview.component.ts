/*!
 * Source https://github.com/donmahallem/ngHeartFit
 */

import {
    Component,
} from '@angular/core';
import { UploadFiles, UploadFileStatus } from '../services';
import { FileUploadBaseComponent } from './file-upload-base.component';
import { FileUploadErrorComponent } from './file-upload-error.component';
import { FileUploadProgressComponent } from './file-upload-progress.component';

@Component({
    selector: 'app-file-preview',
    styleUrls: ['./file-preview.component.scss'],
    templateUrl: './file-preview.component.pug',
    viewProviders: [
        FileUploadErrorComponent,
        FileUploadProgressComponent,
    ],
})
export class FilePreviewComponent extends FileUploadBaseComponent<UploadFiles> {
    constructor() {
        super();
    }

    public get filename(): string {
        if (this.mUploadFile && this.mUploadFile.filename) {
            return this.mUploadFile.filename;
        }
        return 'Unknown';
    }

    public get isFileLoaded(): boolean {
        return this.mUploadFile && this.mUploadFile.status === UploadFileStatus.LOADED;
    }
    public get isFileErrored(): boolean {
        return this.mUploadFile && this.mUploadFile.status === UploadFileStatus.ERROR;
    }
    public get isFileProcessing(): boolean {
        return this.mUploadFile && (this.mUploadFile.status === UploadFileStatus.LOADING ||
            this.mUploadFile.status === UploadFileStatus.INITIALIZING);
    }
}
