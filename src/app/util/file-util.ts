/*!
 * Source https://github.com/donmahallem/ngHeartFit
 */

import { Observable, Subscriber } from 'rxjs';
import { map } from 'rxjs/operators';
export interface IReadFile {
    raw: string;
    source: File;
}

export enum FileLoadEventType {
    START = 1,
    PROGRESS = 2,
    RESULT = 3,
}
export interface IFileLoadEvent {
    type: FileLoadEventType;
    key: string | number;
}

export interface IFileLoadStartEvent extends IFileLoadEvent {
    type: FileLoadEventType.START;
}

export interface IFileLoadProgressEvent extends IFileLoadEvent {
    type: FileLoadEventType.PROGRESS;
    loaded: number;
    total: number;
    lengthComputable: boolean;
}

export interface IFileLoadResultEvent<T> extends IFileLoadEvent {
    type: FileLoadEventType.RESULT;
    result: T;
    filesize: number;
}

export type FileLoadEvents<T> = IFileLoadProgressEvent | IFileLoadResultEvent<T> | IFileLoadStartEvent;
export class FileUtil {

    /**
     * used for stubing tests more easily
     */
    public static createFileReader(): FileReader {
        return new FileReader();
    }
    public static readFileAsText(file: File, key: string | number): Observable<FileLoadEvents<string>> {
        return new Observable((subscriber: Subscriber<FileLoadEvents<string>>) => {
            const reader: FileReader = FileUtil.createFileReader();
            reader.onprogress = (progress: ProgressEvent) => {
                subscriber.next({
                    type: FileLoadEventType.PROGRESS,
                    lengthComputable: progress.lengthComputable,
                    loaded: progress.loaded,
                    total: progress.total,
                    key,
                });
            };
            reader.onabort = (ev: ProgressEvent) => {
                subscriber.error(new AbortSignal());
            };
            reader.onload = (loadEvent: any) => {
                subscriber.next({
                    filesize: loadEvent.target.result.length,
                    key,
                    type: FileLoadEventType.RESULT,
                    result: loadEvent.target.result,
                });
                subscriber.complete();
            };
            reader.onloadstart = () => {
                subscriber.next({
                    key,
                    type: FileLoadEventType.START,
                });
            };
            reader.onerror = (((er: DOMError | DOMException): void => {
                subscriber.error(er);
            }) as any);
            reader.readAsText(file);
        });
    }
    public static readFileAsJson<T>(file: File, key: string | number): Observable<FileLoadEvents<T>> {
        return FileUtil.readFileAsText(file, key)
            .pipe(map((event: FileLoadEvents<string>): FileLoadEvents<T> => {
                if (event.type === FileLoadEventType.RESULT) {
                    const convEvent: IFileLoadResultEvent<T> = {
                        filesize: event.filesize,
                        key: event.key,
                        result: JSON.parse(event.result),
                        type: FileLoadEventType.RESULT,
                    };
                    return convEvent;
                } else {
                    return event;
                }
            }));
    }

}
