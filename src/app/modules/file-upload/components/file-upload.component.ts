/*!
 * Source https://github.com/donmahallem/ngHeartFit
 */

import {
    Component, EventEmitter, Output,
} from '@angular/core';

@Component({
    selector: 'app-file-upload',
    styleUrls: ['./file-upload.component.scss'],
    templateUrl: './file-upload.component.pug',
})
export class FileUploadComponent {

    @Output()
    public fileUpload: EventEmitter<FileList> = new EventEmitter();
    constructor() {
    }

    public onUpload(e: Event): void {
        const target: HTMLInputElement = e.target as HTMLInputElement;
        if (target.files && target.files.length > 0) {
            this.fileUpload.emit(target.files);
        }
    }
}
