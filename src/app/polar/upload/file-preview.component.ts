import {
    Component,
    Input,
    HostBinding,
    Output,
    ViewChild
} from '@angular/core';
import { UploadFile, UploadDataService, UploadFileStatus, UploadFiles, UploadFileResult, UploadFileResults } from '../services';
import { MatCheckboxChange, MatSlideToggle } from '@angular/material';
import { FileUploadErrorComponent } from './file-upload-error.component';
import { FileUploadProgressComponent } from './file-upload-progress.component';
import { FileUploadBaseComponent } from './file-upload-base.component';

@Component({
    selector: 'app-file-preview',
    templateUrl: './file-preview.component.pug',
    styleUrls: ['./file-preview.component.scss'],
    viewProviders: [
        FileUploadErrorComponent,
        FileUploadProgressComponent
    ]
})
export class FilePreviewComponent extends FileUploadBaseComponent<UploadFiles>{
    constructor(private uploadDataService: UploadDataService) {
        super();
    }

    public get filename(): string {
        if (this.mUploadFile && this.mUploadFile.filename) {
            return this.mUploadFile.filename;
        }
        return 'Unknown';
    }

    public get isFileLoaded(): boolean {
        return this.mUploadFile.status === UploadFileStatus.LOADED;
    }
    public get isFileErrored(): boolean {
        return this.mUploadFile.status === UploadFileStatus.ERROR;
    }
    public get isFileProcessing(): boolean {
        return this.mUploadFile.status === UploadFileStatus.LOADING ||
            this.mUploadFile.status === UploadFileStatus.INITIALIZING;
    }
}
