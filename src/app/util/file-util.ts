import { Observable, Subscriber } from 'rxjs';
export interface ReadFile {
    raw: string;
    source: File;
}

export enum FileLoadEventType {
    START = 1,
    PROGRESS = 2,
    RESULT = 3
}
export interface FileLoadEvent {
    type: FileLoadEventType;
}

export interface FileLoadStartEvent extends FileLoadEvent {
    type: FileLoadEventType.START;
}

export interface FileLoadProgressEvent extends FileLoadEvent {
    type: FileLoadEventType.PROGRESS;
    loaded: number;
    total: number;
    lengthComputable: boolean;
}

export interface FileLoadResultEvent<T> extends FileLoadEvent {
    type: FileLoadEventType.RESULT;
    result: T;
}

export type FileLoadEvents<T> = FileLoadProgressEvent | FileLoadResultEvent<T> | FileLoadStartEvent;
export class FileUtil {

    /**
     * used for stubing tests more easily
     */
    public static createFileReader(): FileReader {
        return new FileReader();
    }
    public static readFileAsText(file: File): Observable<FileLoadEvents<string>> {
        return new Observable((subscriber: Subscriber<FileLoadEvents<string>>) => {
            const reader: FileReader = FileUtil.createFileReader();
            reader.onprogress = (progress: ProgressEvent) => {
                subscriber.next({
                    type: FileLoadEventType.PROGRESS,
                    lengthComputable: progress.lengthComputable,
                    loaded: progress.loaded,
                    total: progress.total
                });
            };
            reader.onabort = (ev: ProgressEvent) => {
                subscriber.error(new AbortSignal());
            };
            reader.onload = (loadEvent: any) => {
                subscriber.next({
                    type: FileLoadEventType.RESULT,
                    result: loadEvent.target.result
                });
                subscriber.complete();
            };
            reader.onloadstart = () => {
                subscriber.next({
                    type: FileLoadEventType.START
                });
            };
            reader.onerror = <any>((er: DOMError | DOMException): void => {
                subscriber.error(er);
            });
            reader.readAsText(file);
        });
    }

}
