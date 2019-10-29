/*!
 * Source https://github.com/donmahallem/ngHeartFit
 */

import { Injectable } from '@angular/core';
import { UploadFileResults } from './upload-file.modal';

@Injectable({
    providedIn: 'root',
})
export class DataStorageService {
    private mCache: { [key: string]: UploadFileResults } = {};
    public get storage(): Storage {
        return window.sessionStorage;
    }

    public updateFile(fileEvent: UploadFileResults): string {
        this.mCache[fileEvent.key] = fileEvent;
        this.storage.setItem(fileEvent.key, JSON.stringify(fileEvent));
        return fileEvent.key;
    }

    public getFile(key: string): UploadFileResults {
        if (key in this.mCache) {
            return this.mCache[key];
        }
        return JSON.parse(this.storage.getItem(key));
    }

    public has(key: string): boolean {
        return this.mCache[key] !== undefined;
    }

}
