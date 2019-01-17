import {
    Component,
    AfterViewInit,
    OnDestroy,
    Input
} from '@angular/core';
import { UploadDataService } from '../services/upload-data.service';
import { from, Observable, Observer, Subscription } from 'rxjs';
import { filter, flatMap, map } from 'rxjs/operators';
import { DaySummary, DayData } from "@donmahallem/flowapi";
import { Router, Route, ActivatedRouteSnapshot, ActivatedRoute, Params } from '@angular/router';
import { DataPoint } from './data-point';


@Component({
    selector: 'view-upload-cmp',
    templateUrl: './view-upload.component.pug',
    styleUrls: ['./view-upload.component.scss']
})
export class ViewUploadComponent implements
    AfterViewInit,
    OnDestroy {
    public user: any;
    public chartData: DataPoint[];
    private idSubscription: Subscription;
    constructor(private uploadDataService: UploadDataService,
        private route: ActivatedRoute) {
        this.route.data.subscribe(this.updateData.bind(this));
    }

    public updateData(summary: { uploadData: DaySummary }): void {
        console.log(summary);
        let lst: DataPoint[] = [];
        for (let key of Object.keys(summary.uploadData[0])) {
            for (let pair of summary.uploadData[key].activityGraphData.heartRateTimelineSamples) {
                lst.push({
                    x: new Date(pair.time),
                    y: pair.value
                });
            }
        }
        this.chartData = lst;
    }
    public ngAfterViewInit(): void {
        //this.idSubscription = this.router.
    }

    public ngOnDestroy(): void {

    }
}
