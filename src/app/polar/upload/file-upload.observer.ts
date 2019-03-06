import { Observer } from 'rxjs';
import { TypedFile, TypedFiles, UploadDataService, UploadFileStatus, UploadFileType } from '../services';
import { FileLoadEvents, FileLoadEventType, FileLoadProgressEvent, FileLoadResultEvent, FileLoadStartEvent } from 'src/app/util';

export class FileUploadObserver implements Observer<FileLoadEvents<TypedFiles>> {
    constructor(private readonly uploadDataService: UploadDataService,
        private readonly sourceFile: File) { }
    public updateProgress(ev: FileLoadProgressEvent): void {
        this.uploadDataService.updateFile({
            status: UploadFileStatus.LOADING,
            filename: this.sourceFile.name,
            key: this.sourceFile.name,
            currentBytes: ev.loaded,
            totalBytes: ev.total,
            lengthComputable: ev.lengthComputable
        });
    }
    public updateResult(ev: FileLoadResultEvent<TypedFiles>): void {
        switch (ev.result.type) {
            case UploadFileType.DAY_SUMMARY:
                this.uploadDataService.updateFile({
                    status: UploadFileStatus.LOADED,
                    filename: this.sourceFile.name,
                    key: this.sourceFile.name,
                    data: ev.result.data,
                    type: UploadFileType.DAY_SUMMARY,
                    filesize: ev.filesize
                });
                break;
            case UploadFileType.SLEEP_DATA:
                this.uploadDataService.updateFile({
                    status: UploadFileStatus.LOADED,
                    filename: this.sourceFile.name,
                    key: this.sourceFile.name,
                    data: ev.result.data,
                    type: UploadFileType.SLEEP_DATA,
                    filesize: ev.filesize
                });
                break;
            default:
                throw new Error('Unknown Data Type');
        }
    }

    public updateInit(ev: FileLoadStartEvent): void {
        this.uploadDataService.updateFile({
            status: UploadFileStatus.INITIALIZING,
            filename: this.sourceFile.name,
            key: this.sourceFile.name
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
                status: UploadFileStatus.ERROR,
                error: err,
                key: this.sourceFile.name,
                filename: this.sourceFile.name
            });
    }
    public complete() {

    }
}
