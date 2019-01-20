import { Injectable } from '@angular/core';
import { UploadFile } from './upload-file.modal';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class UploadDataService {
    private uploadFilesSubject: BehaviorSubject<UploadFile[]> = new BehaviorSubject([]);
    private hasUploadableFiles: BehaviorSubject<boolean> = new BehaviorSubject(false);
    public update(): void {
        for (let upFile of this.uploadedFiles) {
            if (upFile.valid && upFile.selected) {
                this.hasUploadableFiles.next(true);
                return;
            }
        }
        this.hasUploadableFiles.next(false);
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