import {
    Component,
    Input,
    HostBinding,
    Output,
    ViewChild
} from '@angular/core';
import { UploadFile, UploadDataService, UploadFileStatus, UploadFiles, UploadFileResult, UploadFileResults, UploadFileProgress } from '../services';
import { MatCheckboxChange, MatSlideToggle } from '@angular/material';

@Component({
    selector: 'app-file-upload-progress',
    templateUrl: './file-upload-progress.component.pug',
    styleUrls: ['./file-upload-progress.component.scss']
})
export class FileUploadProgressComponent {
    constructor() { }
    private mUploadFile: UploadFileProgress;


    @Input('uploadFile')
    public set uploadFile(upload: UploadFileProgress) {
        this.mUploadFile = upload;
    }


    public get uploadFile(): UploadFileProgress {
        return this.mUploadFile;
    }
}
