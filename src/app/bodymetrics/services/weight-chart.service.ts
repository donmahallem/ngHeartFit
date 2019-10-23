/*!
 * Source https://github.com/donmahallem/ngHeartFit
 */

import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { combineLatest, BehaviorSubject, Observable } from 'rxjs';

export enum Status {
    INITIALIZING = 0,
    LOADING = 1,
    LOADED = 2,
    ERROR = 3,
}

@Injectable()
export class WeightChartService {
    private mStartTimeSubject: BehaviorSubject<moment.Moment>;
    private mEndTimeSubject: BehaviorSubject<moment.Moment>;
    private mCombinedObservable: Observable<any>;
    private mStatusSubject: BehaviorSubject<Status>;
    constructor() {
        const time: moment.Moment = moment();
        this.mEndTimeSubject = new BehaviorSubject(time);
        this.mStartTimeSubject = new BehaviorSubject(time.subtract(1, 'month'));
        this.mCombinedObservable = combineLatest([this.mStartTimeSubject, this.mEndTimeSubject]);
        this.mStatusSubject = new BehaviorSubject(Status.INITIALIZING);
    }

    public get statusObservable(): Observable<Status> {
        return this.mStatusSubject.asObservable();
    }

    public get endTimeObservable(): Observable<moment.Moment> {
        return this.mEndTimeSubject.asObservable();
    }

    public get combinedDateListener(): Observable<[moment.Moment, moment.Moment]> {
        return this.mCombinedObservable;
    }

    public set startTime(time: moment.Moment) {
        this.mStartTimeSubject.next(time);
    }

    public set endTime(time: moment.Moment) {
        this.mEndTimeSubject.next(time);
    }
}
