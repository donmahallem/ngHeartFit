import { Injectable } from '@angular/core';
import { UploadFile } from './upload-file.modal';

@Injectable()
export class UploadDataService {
    private readonly KEY_PREFIX: string = "uploadfile_";

    public getData(key: string): UploadFile {
        return JSON.parse(sessionStorage.getItem(this.KEY_PREFIX + key));
    }
    public generateId(): string {
        return "" + sessionStorage.length;
    }
    public setData(key: string, data: UploadFile): void {
        sessionStorage.setItem(this.KEY_PREFIX + key, JSON.stringify(data));
    }

    public insert(data: UploadFile): string {
        const id: string = this.generateId();
        data.key = id;
        this.setData(id, data);
        return id;
    }

    public getFile(key: string): UploadFile {
        if (sessionStorage.getItem(key) == null)
            return null;
        return JSON.parse(sessionStorage.getItem(this.KEY_PREFIX + key));
    }

}