import {
    Input
} from '@angular/core';
import { UploadFile } from '../services';


export class FileUploadBaseComponent<T extends UploadFile> {
    constructor() { }
    protected mUploadFile: T;

    @Input('uploadFile')
    public set uploadFile(upload: T) {
        this.mUploadFile = upload;
    }


    public get uploadFile(): T {
        return this.mUploadFile;
    }
}
