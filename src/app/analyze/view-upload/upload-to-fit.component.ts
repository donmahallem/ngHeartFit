import {
    Component,
    AfterViewInit,
    OnDestroy,
    Input
} from '@angular/core';
import { UploadDataService } from '../services/upload-data.service';
import { from, Observable, Observer, Subscription, BehaviorSubject } from 'rxjs';
import { filter, flatMap, map } from 'rxjs/operators';
import { DaySummary, DayData } from "@donmahallem/flowapi";
import { Router, Route, ActivatedRouteSnapshot, ActivatedRoute, Params } from '@angular/router';
import { DataPoint } from './data-point';


@Component({
    selector: 'upload-to-fit-cmp',
    templateUrl: './upload-to-fit.component.pug',
    styleUrls: ['./upload-to-fit.component.scss']
})
export class UploadToFitComponent implements
    AfterViewInit,
    OnDestroy {
    private dataPointsSubject: BehaviorSubject<DataPoint[]> = new BehaviorSubject<DataPoint[]>([]);
    private subscriptions: Subscription[] = [];
    private numOfItems: number = 0;

    public get numerOfItems(): number {
        return this.numOfItems;
    }


    constructor(private uploadDataService: UploadDataService,
        private route: ActivatedRoute) {
    }

    @Input("dataPoints")
    public set dataPoints(data: DataPoint[]) {
        this.dataPointsSubject.next(data);
    }

    public get dataPoints(): DataPoint[] {
        return this.dataPointsSubject.value;
    }
    public ngAfterViewInit(): void {
        //this.idSubscription = this.router.
        this.subscriptions.push(this.dataPointsSubject.subscribe((dataPoints) => {
            this.numOfItems = dataPoints.length;
        }))
    }

    public uploadData(): void {

    }

    public ngOnDestroy(): void {
        for (let sub of this.subscriptions) {
            sub.unsubscribe();
        }
        this.subscriptions = [];
    }
}
