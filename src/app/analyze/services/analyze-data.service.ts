import { Dexie } from 'dexie';
import { Injectable } from '@angular/core';
import { UploadFile } from './upload-file.modal';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class UploadDataService {
    private heartRateData: Dexie;
    constructor() {
        this.heartRateData = new Dexie("heartrate_db");
    }

    public insert(upload: UploadFile): void {

    }

}