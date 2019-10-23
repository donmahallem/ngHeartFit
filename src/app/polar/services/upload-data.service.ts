/*!
 * Source https://github.com/donmahallem/ngHeartFit
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUploadFile, UploadFiles, UploadFileStatus } from './upload-file.modal';

@Injectable()
export class UploadDataService {
    private uploadFilesSubject: BehaviorSubject<IUploadFile[]> = new BehaviorSubject([]);
    private filesSelectedSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
    private mData: { [key: string]: UploadFiles } = {};
    public update(): void {
        const lst: UploadFiles[] = [];
        const filesSelected = false;
        for (const key in this.mData) {
            if (key) {
                lst.push(this.mData[key]);
            }
        }
        this.uploadFilesSubject.next(lst);
        this.filesSelectedSubject.next(false);
    }

    public updateFile(fileEvent: UploadFiles) {
        this.mData[fileEvent.key] = fileEvent;
        this.update();
    }

    public setSelected(key: string, selected: boolean): void {
        if (this.mData[key] && this.mData[key].status === UploadFileStatus.LOADED) {
            (this.mData[key] as any).selected = selected;
            this.update();
        }
    }

    public set uploadedFiles(files: IUploadFile[]) {
        this.uploadFilesSubject.next(files);
    }

    public get uploadedFiles(): IUploadFile[] {
        return this.uploadFilesSubject.value;
    }

    public get uploadedFilesObservable(): Observable<IUploadFile[]> {
        return this.uploadFilesSubject.asObservable();
    }

    public get hasSelectedFilesObservable(): Observable<boolean> {
        return this.filesSelectedSubject.asObservable();
    }

    public get hasSelectedFiles(): boolean {
        return this.filesSelectedSubject.value;
    }

    public addUploadFile(f: IUploadFile): void {
        const lst: IUploadFile[] = this.uploadFilesSubject.value;
        lst.push(f);
        this.uploadFilesSubject.next(lst);
    }

    public clear(): void {
        this.uploadFilesSubject.next([]);
    }

}
