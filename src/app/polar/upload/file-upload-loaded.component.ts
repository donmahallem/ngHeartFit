/*!
 * Source https://github.com/donmahallem/ngHeartFit
 */

import {
    Component,
} from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { UploadDataService, UploadFileResults, UploadFileType } from '../services';
import { FileUploadBaseComponent } from './file-upload-base.component';

@Component({
    selector: 'app-file-upload-loaded',
    styleUrls: ['./file-upload-loaded.component.scss'],
    templateUrl: './file-upload-loaded.component.pug',
})
export class FileUploadLoadedComponent extends FileUploadBaseComponent<UploadFileResults> {

    constructor(private uploadDataService: UploadDataService) {
        super();
    }
    public get filesize(): number {
        if (this.mUploadFile) {
            return this.mUploadFile.filesize;
        }
        return 0;
    }

    public get type(): UploadFileType {
        if (this.mUploadFile && this.mUploadFile.type) {
            return this.mUploadFile.type;
        }
        return UploadFileType.UNKNOWN;
    }

    public get selected(): boolean {
        if (this.mUploadFile) {
            return this.mUploadFile.selected;
        }
        return false;
    }

    public get typeIcon(): string {
        if (this.mUploadFile) {
            switch (this.type) {
                case UploadFileType.DAY_SUMMARY:
                    return 'favorite_border';
                case UploadFileType.SLEEP_DATA:
                    return 'brightness_2';
            }
        }
        return 'help_outline';
    }

    public onCheckChange(ev: MatSlideToggleChange): void {
        if (this.mUploadFile) {
            this.uploadDataService.setSelected(this.mUploadFile.key, ev.checked);
        }
    }
}
