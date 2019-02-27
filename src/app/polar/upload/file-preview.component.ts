import {
    Component,
    Input,
    HostBinding,
    Output,
    ViewChild
} from '@angular/core';
import { UploadFile, UploadDataService } from '../services';
import { MatCheckboxChange, MatSlideToggle } from '@angular/material';

@Component({
    selector: 'app-file-preview',
    templateUrl: './file-preview.component.pug',
    styleUrls: ['./file-preview.component.scss']
})
export class FilePreviewComponent {
    constructor(private uploadDataService: UploadDataService) { }
    private mUploadFile: UploadFile;

    public get isValidFile(): boolean {
        if (this.mUploadFile) {
            return this.mUploadFile.valid;
        }
        return false;
    }

    public get filename(): string {
        if (this.mUploadFile && this.mUploadFile.filename) {
            return this.mUploadFile.filename;
        }
        return 'Unknown';
    }

    public get filesize(): number {
        if (this.mUploadFile && this.mUploadFile.data) {
            return this.mUploadFile.data.length;
        }
        return 0;
    }

    @Input('uploadFile')
    public set uploadFile(upload: UploadFile) {
        this.mUploadFile = upload;
    }

    public get isSelected(): boolean {
        if (this.mUploadFile && this.uploadFile.valid) {
            return this.mUploadFile.selected;
        }
        return false;
    }

    public get uploadFile(): UploadFile {
        return this.mUploadFile;
    }

    public onChangeSelection(event: MatCheckboxChange): void {
        this.mUploadFile.selected = event.checked;
        this.uploadDataService.update();
    }
}
