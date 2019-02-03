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
import { AnalyzeDataService, Pair } from '../services/analyze-data.service';


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
    constructor(private analyzeDataService: AnalyzeDataService) {
    }

    public updateData(summary: Pair[]): void {
        console.log(summary);
        let lst: DataPoint[] = [];
        for (let p of summary) {
            lst.push({
                x: new Date(p.timestamp),
                y: p.bpm
            });
        }
        this.chartData = lst;
    }
    public ngAfterViewInit(): void {
        //this.idSubscription = this.router.
        this.analyzeDataService
            .getHeartRate()
            .subscribe(this.updateData.bind(this));
    }

    public ngOnDestroy(): void {

    }
}
