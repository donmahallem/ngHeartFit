/*!
 * Source https://github.com/donmahallem/ngHeartFit
 */

import { Injectable } from '@angular/core';
import { GoogleApiService } from 'ng-gapi';
import { BehaviorSubject, Observable } from 'rxjs';

export enum GapiStatus {
    LOADING = 1,
    LOADED = 2,
    FAILED = 3,
}

@Injectable()
export class NgGapiService {
    private statusSubject: BehaviorSubject<GapiStatus> = new BehaviorSubject(GapiStatus.LOADING);
    constructor(gapiService: GoogleApiService) {
        gapiService.onLoad().subscribe((loadStatus) => {
            this.statusSubject.next(GapiStatus.LOADED);
        }, (err) => {
            this.statusSubject.next(GapiStatus.FAILED);
        });
    }

    public get statusObservable(): Observable<GapiStatus> {
        return this.statusSubject.asObservable();
    }
}
