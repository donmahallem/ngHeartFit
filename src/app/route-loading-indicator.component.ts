import { Component, OnInit, NgZone, AfterViewInit, OnDestroy } from '@angular/core';
import {
    Router,
    Event,
    NavigationStart,
    NavigationEnd,
    NavigationCancel,
    NavigationError
} from '@angular/router';
import { Subscription, Subscriber } from 'rxjs';

export class RouteLoadingSubscriber extends Subscriber<Event>{

    constructor(private indicatorCmp: RouteLoadingIndicatorComponent) {
        super();
    }
    next(value?: Event): void {
        switch (true) {
            case value instanceof NavigationStart:
                this.indicatorCmp.loading = true;
                break;
            case value instanceof NavigationEnd:
            case value instanceof NavigationCancel:
            case value instanceof NavigationError:
                this.indicatorCmp.loading = false;
                break;
        }
    }
}

@Component({
    selector: 'app-route-loading-indicator',
    templateUrl: './route-loading-indicator.component.pug',
    styleUrls: ['./route-loading-indicator.component.scss']
})
export class RouteLoadingIndicatorComponent implements OnInit, OnDestroy {
    private subscription: Subscription;

    public loading: boolean = false;
    constructor(private router: Router) {

    }
    public ngOnInit(): void {
        this.subscription = this.router
            .events
            .subscribe(new RouteLoadingSubscriber(this))
    }

    public ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
