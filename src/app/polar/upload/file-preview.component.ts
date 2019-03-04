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

@Component({
    selector: 'app-file-preview',
    templateUrl: './file-preview.component.pug',
    styleUrls: ['./file-preview.component.scss'],
    viewProviders: [
        FileUploadErrorComponent,
        FileUploadProgressComponent
    ]
})
export class FilePreviewComponent {
    constructor(private uploadDataService: UploadDataService) { }
    private mUploadFile: UploadFiles;

    public get filename(): string {
        if (this.mUploadFile && this.mUploadFile.filename) {
            return this.mUploadFile.filename;
        }
        return 'Unknown';
    }

    @Input('uploadFile')
    public set uploadFile(upload: UploadFiles) {
        this.mUploadFile = upload;
    }

    public get uploadFile(): UploadFiles {
        return this.mUploadFile;
    }
}
