import { Injectable } from '@angular/core';
import { GoogleApiService } from 'ng-gapi';
import { BehaviorSubject, Observable, Observer, Subscribable, Subscriber } from 'rxjs';


export enum GapiStatus {
    LOADING = 1,
    LOADED = 2,
    FAILED = 3
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

    public get loadClient(): Observable<void> {
        return new Observable<void>((subscriber: Subscriber<void>) => {
            const loadCfg: any = {
                callback: () => {
                    subscriber.next(null);
                    subscriber.complete();
                },
                onerror: (err: Error) => {
                    subscriber.error(err);
                }
            };
            gapi.load('client', loadCfg);
        });
    }
}
