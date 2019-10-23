/*!
 * Source https://github.com/donmahallem/ngHeartFit
 */

import { Observable, Subscriber } from 'rxjs';
import { map } from 'rxjs/operators';
export interface ReadFile {
    raw: string;
    source: File;
}

export enum FileLoadEventType {
    START = 1,
    PROGRESS = 2,
    RESULT = 3,
}
export interface FileLoadEvent {
    type: FileLoadEventType;
    key: string | number;
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
    filesize: number;
}

export type FileLoadEvents<T> = FileLoadProgressEvent | FileLoadResultEvent<T> | FileLoadStartEvent;
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
                    type: FileLoadEventType.RESULT,
                    result: loadEvent.target.result,
                    key,
                    filesize: loadEvent.target.result.length,
                });
                subscriber.complete();
            };
            reader.onloadstart = () => {
                subscriber.next({
                    type: FileLoadEventType.START,
                    key,
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
                    const convEvent: FileLoadResultEvent<T> = {
                        result: JSON.parse(event.result),
                        type: FileLoadEventType.RESULT,
                        key: event.key,
                        filesize: event.filesize,
                    };
                    return convEvent;
                } else {
                    return event;
                }
            }));
    }

}
