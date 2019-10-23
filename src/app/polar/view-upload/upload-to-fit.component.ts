/*!
 * Source https://github.com/donmahallem/ngHeartFit
 */

import {
    Component,
    Input,
} from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { FitApiDataSourceService } from 'src/app/service/fit-data-source.service';
import { DataPoint } from './data-point';

@Component({
    selector: 'upload-to-fit-cmp',
    templateUrl: './upload-to-fit.component.pug',
    styleUrls: ['./upload-to-fit.component.scss'],
})
export class UploadToFitComponent {
    private dataPointsSubject: BehaviorSubject<DataPoint[]> = new BehaviorSubject<DataPoint[]>([]);
    private subscriptions: Subscription[] = [];
    private mNumberOfItems = 0;

    constructor(private fitDataSourceService: FitApiDataSourceService) {
    }

    @Input('dataPoints')
    public set dataPoints(data: DataPoint[]) {
        if (Array.isArray(data)) {
            this.dataPointsSubject.next(data);
            this.mNumberOfItems = data.length;
            return;
        }
        this.dataPointsSubject.next([]);
        this.mNumberOfItems = 0;
    }

    public get numberOfItems(): number {
        return this.mNumberOfItems;
    }

    public get dataPoints(): DataPoint[] {
        return this.dataPointsSubject.value;
    }

    public uploadData(): void {
        this.fitDataSourceService.getDataSources()
            .subscribe(console.log, console.error);
    }
    public createDatasource(): void {
        this.fitDataSourceService.createDataSource(null)
            .subscribe(console.log, console.error);
    }
    public sendData(): void {
    }

}
