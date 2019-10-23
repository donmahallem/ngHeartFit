import {
    Input,
} from '@angular/core';
import { UploadFile } from '../services';

export class FileUploadBaseComponent<T extends UploadFile> {

    @Input('uploadFile')
    public set uploadFile(upload: T) {
        this.mUploadFile = upload;
    }

    public get uploadFile(): T {
        return this.mUploadFile;
    }
    protected mUploadFile: T;
    constructor() { }
}
