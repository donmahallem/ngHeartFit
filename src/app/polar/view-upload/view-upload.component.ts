/*!
 * Source https://github.com/donmahallem/ngHeartFit
 */

import {
    AfterViewInit,
    Component,
    OnDestroy,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { AnalyzeDataService, Pair } from '../services/analyze-data.service';
import { DataPoint } from './data-point';

@Component({
    selector: 'view-upload-cmp',
    templateUrl: './view-upload.component.pug',
    styleUrls: ['./view-upload.component.scss'],
})
export class ViewUploadComponent implements
    AfterViewInit,
    OnDestroy {
    public user: any;
    public chartData: DataPoint[] = [];
    private idSubscription: Subscription;
    constructor(private analyzeDataService: AnalyzeDataService) {
    }

    public updateData(summary: Pair[]): void {
        const lst: DataPoint[] = [];
        for (const p of summary) {
            lst.push({
                x: new Date(p.timestamp),
                y: p.bpm,
            });
        }
        this.chartData = lst;
    }
    public ngAfterViewInit(): void {
        // this.idSubscription = this.router.
        this.analyzeDataService
            .getHeartRate()
            .subscribe(this.updateData.bind(this));
    }

    public ngOnDestroy(): void {

    }
}
