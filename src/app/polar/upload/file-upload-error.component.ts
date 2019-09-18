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
    selector: 'app-file-upload-error',
    templateUrl: './file-upload-error.component.pug',
    styleUrls: ['./file-upload-error.component.scss']
})
export class FileUploadErrorComponent extends FileUploadBaseComponent<UploadFileError> {

    public get isValidationError(): boolean {
        return (this.mUploadFile && this.mUploadFile.error instanceof ValidationError);
    }
}