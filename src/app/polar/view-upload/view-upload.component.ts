/*!
 * Source https://github.com/donmahallem/ngHeartFit
 */

import {
    AfterViewInit,
    Component,
    OnDestroy,
} from '@angular/core';
import { AnalyzeDataService, IPair } from '../services/analyze-data.service';
import { IDataPoint } from './data-point';

@Component({
    selector: 'view-upload-cmp',
    styleUrls: ['./view-upload.component.scss'],
    templateUrl: './view-upload.component.pug',
})
export class ViewUploadComponent implements
    AfterViewInit,
    OnDestroy {
    public user: any;
    public chartData: IDataPoint[] = [];
    constructor(private analyzeDataService: AnalyzeDataService) {
    }

    public updateData(summary: IPair[]): void {
        const lst: IDataPoint[] = [];
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
