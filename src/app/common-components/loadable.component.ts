/*!
 * Source https://github.com/donmahallem/ngHeartFit
 */

import { HttpEvent, HttpEventType } from '@angular/common/http';
import {
    AfterViewInit,
    OnDestroy,
} from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';

export class LoadableSubscriber<T> extends Subscriber<HttpEvent<T>> {

    constructor(private sessionCmp: LoadableComponent<T>) {
        super();
    }
    next(value: HttpEvent<T>): void {
        switch (value.type) {
            case HttpEventType.Response:
                this.sessionCmp.onResult(value.body);
                this.sessionCmp.loadingStatus = LoadingStatus.LOADED;
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
    }
}

export enum LoadingStatus {
    LOADING = 1,
    LOADED = 2,
    ERROR = 3,
    INITIALIZING = 4,
}

export abstract class LoadableComponent<T> implements OnDestroy, AfterViewInit {
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
        if (this.mLoadingStatus === LoadingStatus.LOADING) {
            return;
        }
        this.mLoadingSubscription = this.createLoadObservable()
            .subscribe(new LoadableSubscriber(this));
    }

    public get progressBarMode(): 'determinate' | 'indeterminate' | 'buffer' | 'query' {
        if (this.loadingStatus === LoadingStatus.INITIALIZING) {
            return 'query';
        }
        return 'indeterminate';
    }

    public ngOnDestroy() {
        if (this.mLoadingSubscription) {
            this.mLoadingSubscription.unsubscribe();
        }
    }
}
