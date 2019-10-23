import {
    Component,
} from '@angular/core';
import { ValidationError } from 'jsonschema';
import { UploadFileError } from '../services';
import { FileUploadBaseComponent } from './file-upload-base.component';

@Component({
    selector: 'app-file-upload-error',
    templateUrl: './file-upload-error.component.pug',
    styleUrls: ['./file-upload-error.component.scss'],
})
export class FileUploadErrorComponent extends FileUploadBaseComponent<UploadFileError> {

    public get isValidationError(): boolean {
        return (this.mUploadFile && this.mUploadFile.error instanceof ValidationError);
    }
}
