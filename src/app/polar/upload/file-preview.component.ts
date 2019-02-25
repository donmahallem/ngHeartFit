import {
    Component,
    Input,
    HostBinding
} from '@angular/core';
import { UploadFile, UploadDataService } from '../services';
import { MatCheckboxChange } from '@angular/material';

@Component({
    selector: 'file-preview-cmp',
    templateUrl: './file-preview.component.pug',
    styleUrls: ['./file-preview.component.scss']
})
export class FilePreviewComponent {
    public user: any;
    constructor(private uploadDataService: UploadDataService) { }
    private mUploadFile: UploadFile;
    public get isValidFile(): boolean {
        if (this.mUploadFile) {
            return this.mUploadFile.valid;
        }
        return false;
    }

    public get filename(): string {
        if (this.mUploadFile) {
            return this.mUploadFile.filename;
        }
        return 'Unknown';
    }
    public get filesize(): number {
        if (this.mUploadFile) {
            return this.mUploadFile.data.length;
        }
        return 0;
    }
    @Input('uploadFile')
    public set uploadFile(upload: UploadFile) {
        this.mUploadFile = upload;
    }

    public get uploadFile(): UploadFile {
        return this.mUploadFile;
    }

    public onChangeSelection(event: MatCheckboxChange): void {
        this.mUploadFile.selected = event.checked;
        this.uploadDataService.update();
    }
}
