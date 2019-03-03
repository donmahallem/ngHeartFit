import {
    Component,
    Input,
    HostBinding,
    Output,
    ViewChild
} from '@angular/core';
import { UploadFile, UploadDataService, UploadFileStatus, UploadFiles, UploadFileResult, UploadFileResults } from '../services';
import { MatCheckboxChange, MatSlideToggle } from '@angular/material';

@Component({
    selector: 'app-file-preview',
    templateUrl: './file-preview.component.pug',
    styleUrls: ['./file-preview.component.scss']
})
export class FilePreviewComponent {
    constructor(private uploadDataService: UploadDataService) { }
    private mUploadFile: UploadFiles;

    public get isValidFile(): boolean {
        if (this.mUploadFile.status === UploadFileStatus.LOADED) {
            return true;
        }
        return false;
    }

    public get filename(): string {
        if (this.mUploadFile && this.mUploadFile.filename) {
            return this.mUploadFile.filename;
        }
        return 'Unknown';
    }

    public isUploadResult(file: UploadFiles): boolean {
        return (file && file.status === UploadFileStatus.LOADED);
    }

    public get filesize(): number {
        if (this.isUploadResult(this.mUploadFile)) {
            return (<UploadFileResults>this.mUploadFile).filesize;
        }
        return 0;
    }

    @Input('uploadFile')
    public set uploadFile(upload: UploadFiles) {
        this.mUploadFile = upload;
    }

    public get isSelected(): boolean {
        if (this.mUploadFile && this.uploadFile.status === UploadFileStatus.LOADED) {
            return (<UploadFileResults>this.mUploadFile).selected === true;
        }
        return false;
    }

    public get uploadFile(): UploadFiles {
        return this.mUploadFile;
    }

    public onChangeSelection(event: MatCheckboxChange): void {
        this.uploadDataService.setSelected(this.mUploadFile.key, event.checked);
    }
}
