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
@Component({
    selector: 'view-upload-cmp',
    templateUrl: './view-upload.component.pug',
    styleUrls: ['./view-upload.component.scss']
})
export class ViewUploadComponent implements
    AfterViewInit,
    OnDestroy {
    public user: any;
    public chartData: any[];
    private idSubscription: Subscription;
    constructor(private uploadDataService: UploadDataService,
        private route: ActivatedRoute) {
        this.route.params.subscribe((params: Params) => {
            if (params.id) {
                console.log(uploadDataService.getData(params.id));
            } else {
                console.log("error");
            }
        });
    }
    public ngAfterViewInit(): void {
        //this.idSubscription = this.router.
    }

    public ngOnDestroy(): void {

    }
}
