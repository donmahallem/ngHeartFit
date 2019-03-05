import {
    Component,
    Input,
    HostBinding,
    Output,
    ViewChild
} from '@angular/core';
import { UploadFile, UploadDataService, UploadFileStatus, UploadFiles, UploadFileResult, UploadFileResults, UploadFileProgress, UploadFileError } from '../services';
import { MatCheckboxChange, MatSlideToggle } from '@angular/material';

@Component({
    selector: 'app-file-upload-error',
    templateUrl: './file-upload-error.component.pug',
    styleUrls: ['./file-upload-error.component.scss']
})
export class FileUploadErrorComponent {
    constructor() { }
    private mUploadFile: UploadFileError;


    @Input('uploadFile')
    public set uploadFile(upload: UploadFileError) {
        this.mUploadFile = upload;
    }


    public get uploadFile(): UploadFileError {
        return this.mUploadFile;
    }
}
