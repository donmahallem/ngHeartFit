import {
    Component,
    Input,
    HostBinding,
    Output,
    ViewChild
} from '@angular/core';
import { UploadFile, UploadDataService, UploadFileStatus, UploadFiles, UploadFileResult, UploadFileResults, UploadFileProgress, UploadFileError, UploadFileType } from '../services';
import { MatCheckboxChange, MatSlideToggle } from '@angular/material';
import { FileUploadBaseComponent } from './file-upload-base.component';
import { ValidationError } from 'jsonschema';

@Component({
    selector: 'app-file-upload-loaded',
    templateUrl: './file-upload-loaded.component.pug',
    styleUrls: ['./file-upload-loaded.component.scss']
})
export class FileUploadLoadedComponent extends FileUploadBaseComponent<UploadFileResults> {

    public get filesize(): number {
        if (this.mUploadFile) {
            return this.mUploadFile.filesize;
        }
        return 0;
    }

    public get type(): UploadFileType {
        if (this.mUploadFile) {
            return this.mUploadFile.type;
        }
        return UploadFileType.UNKNOWN;
    }

    public get selected(): boolean {
        if (this.mUploadFile) {
            return this.mUploadFile.selected !== false;
        }
        return false;
    }
}
