import { Injectable } from '@angular/core';
import { UploadFile, TypedFile, TypedFiles, UploadFileType, UploadFileStatus, UploadFiles } from './upload-file.modal';
import { BehaviorSubject, Observable } from 'rxjs';
import { FileLoadEvents, FileLoadEventType } from 'src/app/util';

@Injectable()
export class UploadDataService {
    private uploadFilesSubject: BehaviorSubject<UploadFile[]> = new BehaviorSubject([]);
    private hasUploadableFiles: BehaviorSubject<boolean> = new BehaviorSubject(false);
    private mData: { [key: string]: UploadFile } = {};
    public update(): void {
        for (const upFile of this.uploadedFiles) {
        }
        this.hasUploadableFiles.next(false);
    }

    public updateFile(fileEvent: UploadFiles) {
        if (this.mData[fileEvent.key]) {

        } else {
            this.updateFile(fileEvent);
        }
    }

    public setSelected(key: string, selected: boolean): void {

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

    public get uploadableFilesObservable(): Observable<boolean> {
        return this.hasUploadableFiles.asObservable();
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
