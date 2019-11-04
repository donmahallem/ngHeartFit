/*!
 * Source https://github.com/donmahallem/ngHeartFit
 */

import { Observer } from 'rxjs';
import { FileLoadEvents, FileLoadEventType, IFileLoadProgressEvent, IFileLoadResultEvent, IFileLoadStartEvent } from 'src/app/util';
import { TypedFiles, UploadDataService, UploadFileStatus, UploadFileType } from '../services';

export class FileUploadObserver implements Observer<FileLoadEvents<TypedFiles>> {
    constructor(private readonly uploadDataService: UploadDataService,
                private readonly sourceFile: File) { }
    public updateProgress(ev: IFileLoadProgressEvent): void {
        this.uploadDataService.updateFile({
            currentBytes: ev.loaded,
            filename: this.sourceFile.name,
            key: this.sourceFile.name,
            lengthComputable: ev.lengthComputable,
            status: UploadFileStatus.LOADING,
            totalBytes: ev.total,
        });
    }
    public updateResult(ev: IFileLoadResultEvent<TypedFiles>): void {
        switch (ev.result.type) {
            case UploadFileType.DAY_SUMMARY:
                this.uploadDataService.updateFile({
                    data: ev.result.data,
                    filename: this.sourceFile.name,
                    filesize: ev.filesize,
                    key: this.sourceFile.name,
                    status: UploadFileStatus.LOADED,
                    type: UploadFileType.DAY_SUMMARY,
                });
                break;
            case UploadFileType.SLEEP_DATA:
                this.uploadDataService.updateFile({
                    data: ev.result.data,
                    filename: this.sourceFile.name,
                    filesize: ev.filesize,
                    key: this.sourceFile.name,
                    status: UploadFileStatus.LOADED,
                    type: UploadFileType.SLEEP_DATA,
                });
                break;
            default:
                throw new Error('Unknown Data Type');
        }
    }

    public updateInit(ev: IFileLoadStartEvent): void {
        this.uploadDataService.updateFile({
            filename: this.sourceFile.name,
            key: this.sourceFile.name,
            status: UploadFileStatus.INITIALIZING,
        });
    }
    public updateError(ev: { type: FileLoadEventType.PROGRESS }): void {

    }
    public next(ev: FileLoadEvents<TypedFiles>) {
        switch (ev.type) {
            case FileLoadEventType.PROGRESS:
                this.updateProgress(ev);
                return;
            case FileLoadEventType.RESULT:
                this.updateResult(ev);
                return;
            case FileLoadEventType.START:
                this.updateInit(ev);
                return;
            default:
                throw new Error('Unknown File');
        }
    }
    public error(err: any) {
        this.uploadDataService
            .updateFile({
                error: err,
                filename: this.sourceFile.name,
                key: this.sourceFile.name,
                status: UploadFileStatus.ERROR,
            });
    }
    public complete() {

    }
}
