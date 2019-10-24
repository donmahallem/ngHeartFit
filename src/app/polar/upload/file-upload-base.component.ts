/*!
 * Source https://github.com/donmahallem/ngHeartFit
 */

import {
    Input,
} from '@angular/core';
import { IUploadFile } from '../services';

export class FileUploadBaseComponent<T extends IUploadFile> {

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
