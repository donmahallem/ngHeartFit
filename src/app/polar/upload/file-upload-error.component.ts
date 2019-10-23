/*!
 * Source https://github.com/donmahallem/ngHeartFit
 */

import {
    Component,
} from '@angular/core';
import { ValidationError } from 'jsonschema';
import { IUploadFileError } from '../services';
import { FileUploadBaseComponent } from './file-upload-base.component';

@Component({
    selector: 'app-file-upload-error',
    templateUrl: './file-upload-error.component.pug',
    styleUrls: ['./file-upload-error.component.scss'],
})
export class FileUploadErrorComponent extends FileUploadBaseComponent<IUploadFileError> {

    public get isValidationError(): boolean {
        return (this.mUploadFile && this.mUploadFile.error instanceof ValidationError);
    }
}
