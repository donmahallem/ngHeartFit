import {
    Component,
    OnInit,
    ViewChild,
    AfterViewInit,
    OnDestroy,
    ChangeDetectorRef,
    NgZone
} from '@angular/core';
import { FitSession, ListSessionsResponse } from 'src/app/service/fit-api-modals';
import * as moment from 'moment';
import { FitApiSessionService } from 'src/app/service/fit-session.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Subscriber, Subscription, Observable } from 'rxjs';

export class LoadableListSubscriber<T> extends Subscriber<HttpEvent<T>>{

    constructor(private sessionCmp: LoadableListComponent<T>) {
        super();
    }
    next(value: HttpEvent<T>): void {
        switch (value.type) {
            case HttpEventType.Response:
                this.sessionCmp.onResult(value.body);
                break;
            case HttpEventType.Sent:
                this.sessionCmp.loadingStatus = LoadingStatus.ERROR;
                break;
        }
    }
    error(err?: any): void {
        this.sessionCmp.loadingStatus = LoadingStatus.ERROR;
    }
    complete(): void {
        this.sessionCmp.loadingStatus = LoadingStatus.LOADED;
    };
}

export enum LoadingStatus {
    LOADING = 1,
    LOADED = 2,
    ERROR = 3,
    INITIALIZING = 4
}

export abstract class LoadableListComponent<T> implements OnDestroy, AfterViewInit {
    private mLoadingStatus: LoadingStatus = LoadingStatus.INITIALIZING;
    private mLoadingSubscription: Subscription;
    constructor() {
    }

    public get loadingStatus(): LoadingStatus {
        return this.mLoadingStatus;
    }

    public set loadingStatus(status: LoadingStatus) {
        this.mLoadingStatus = status;
    }

    public abstract onResult(result: T);
    public abstract createLoadObservable(): Observable<HttpEvent<T>>;

    public ngAfterViewInit() {
        this.update();
    }

    public update(): void {
        if (this.mLoadingStatus === LoadingStatus.LOADING)
            return;
        this.mLoadingSubscription = this.createLoadObservable()
            .subscribe(new LoadableListSubscriber(this));
    }


    public ngOnDestroy() {
        if (this.mLoadingSubscription) {
            this.mLoadingSubscription.unsubscribe();
        }
    }
}
