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
import { GoogleApiService } from 'ng-gapi';


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


    constructor(private gapiService: GoogleApiService) {
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
        this.gapiService.onLoad().pipe(map((a:any)=>{
            
        }))
        let req = {
            path: "https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate",
            method: "post",
            body: {
                "aggregateBy": [{
                    "dataSourceId":
                        "derived:com.google.weight:com.google.android.gms:merge_weight"
                }/*,{
                    "dataSourceId":
                        "derived:com.google.body.fat.percentage:com.google.android.gms:merge_weight"
                }*/],
                "bucketByTime": { "durationMillis": 86400000 },
                "startTimeMillis": Date.now() - (10 * 86400000),
                "endTimeMillis": Date.now()
            }
        };
        console.log("MERGE MAP");
        return from(gapi.client.request(req));
    }

    public ngOnDestroy(): void {
        for (let sub of this.subscriptions) {
            sub.unsubscribe();
        }
        this.subscriptions = [];
    }
}
