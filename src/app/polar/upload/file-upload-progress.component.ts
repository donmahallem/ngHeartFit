/*!
 * Source https://github.com/donmahallem/ngHeartFit
 */

import {
    Component,
} from '@angular/core';
import { IUploadFileInitializing, IUploadFileProgress, UploadFileStatus } from '../services';
import { FileUploadBaseComponent } from './file-upload-base.component';

@Component({
    selector: 'app-file-upload-progress',
    styleUrls: ['./file-upload-progress.component.scss'],
    templateUrl: './file-upload-progress.component.pug',
})
export class FileUploadProgressComponent extends FileUploadBaseComponent<IUploadFileProgress | IUploadFileInitializing> {

    public get currentProgress(): number {
        if (this.mUploadFile &&
            this.mUploadFile.status === UploadFileStatus.LOADING &&
            this.mUploadFile.lengthComputable) {
            return this.mUploadFile.currentBytes;
        }
        return 0;
    }

    public get totalProgress(): number {
        if (this.mUploadFile &&
            this.mUploadFile.status === UploadFileStatus.LOADING &&
            this.mUploadFile.lengthComputable) {
            return this.mUploadFile.totalBytes;
        }
        return 0;
    }

    public get progressBarValue(): number {
        if (this.mUploadFile &&
            this.mUploadFile.status === UploadFileStatus.LOADING &&
            this.mUploadFile.lengthComputable &&
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
                if (this.mUploadFile.lengthComputable) {
                    return 'determinate';
                } else {
                    return 'indeterminate';
                }
            }
        }
        return 'buffer';
    }
}
