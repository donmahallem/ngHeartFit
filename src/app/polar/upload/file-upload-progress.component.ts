import {
    Component,
    Input,
    HostBinding,
    Output,
    ViewChild
} from '@angular/core';
import { UploadFile, UploadDataService, UploadFileStatus, UploadFiles, UploadFileResult, UploadFileResults, UploadFileProgress, UploadFileInitializing } from '../services';
import { MatCheckboxChange, MatSlideToggle, MatProgressBar } from '@angular/material';
import { FileUploadBaseComponent } from './file-upload-base.component';

@Component({
    selector: 'app-file-upload-progress',
    templateUrl: './file-upload-progress.component.pug',
    styleUrls: ['./file-upload-progress.component.scss']
})
export class FileUploadProgressComponent extends FileUploadBaseComponent<UploadFileProgress | UploadFileInitializing> {

    public get currentProgress(): number {
        if (this.mUploadFile &&
            this.mUploadFile.status === UploadFileStatus.LOADING &&
            this.mUploadFile.lengthComputable === true) {
            return this.mUploadFile.currentBytes;
        }
        return 0;
    }

    public get totalProgress(): number {
        if (this.mUploadFile &&
            this.mUploadFile.status === UploadFileStatus.LOADING &&
            this.mUploadFile.lengthComputable === true) {
            return this.mUploadFile.totalBytes;
        }
        return 0;
    }

    public get progressBarValue(): number {
        if (this.mUploadFile &&
            this.mUploadFile.status === UploadFileStatus.LOADING &&
            this.mUploadFile.lengthComputable === true &&
            this.mUploadFile.totalBytes > 0) {
            return 100.0 * this.mUploadFile.currentBytes / this.mUploadFile.totalBytes;
        }
        return 0;
    }

    public get progressBarMode(): 'determinate' | 'indeterminate' | 'buffer' | 'query' {
        if (this.mUploadFile) {
            if (this.mUploadFile.status === UploadFileStatus.INITIALIZING) {
                return 'query';
            } else if (this.mUploadFile.status === UploadFileStatus.LOADING) {
                if (this.mUploadFile.lengthComputable === true) {
                    return 'determinate';
                } else {
                    return 'indeterminate';
                }
            }
        }
        return 'buffer';
    }
}
