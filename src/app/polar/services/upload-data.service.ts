import { Injectable } from '@angular/core';
import { UploadFile, TypedFile, TypedFiles, UploadFileType, UploadFileStatus, UploadFiles } from './upload-file.modal';
import { BehaviorSubject, Observable } from 'rxjs';
import { FileLoadEvents, FileLoadEventType } from 'src/app/util';

@Injectable()
export class UploadDataService {
    private uploadFilesSubject: BehaviorSubject<UploadFile[]> = new BehaviorSubject([]);
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
            (<any>this.mData[key]).selected = selected;
            this.update();
        }
    }

    public set uploadedFiles(files: UploadFile[]) {
        this.uploadFilesSubject.next(files);
    }

    public get uploadedFiles(): UploadFile[] {
        return this.uploadFilesSubject.value;
    }

    public get uploadedFilesObservable(): Observable<UploadFile[]> {
        return this.uploadFilesSubject.asObservable();
    }

    public get hasSelectedFilesObservable(): Observable<boolean> {
        return this.filesSelectedSubject.asObservable();
    }

    public addUploadFile(f: UploadFile): void {
        const lst: UploadFile[] = this.uploadFilesSubject.value;
        lst.push(f);
        this.uploadFilesSubject.next(lst);
    }

    public clear(): void {
        this.uploadFilesSubject.next([]);
    }

}
