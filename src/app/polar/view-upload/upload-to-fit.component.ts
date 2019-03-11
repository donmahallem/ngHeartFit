import {
    Component,
    AfterViewInit,
    OnDestroy,
    Input
} from '@angular/core';
import { Subscription, BehaviorSubject } from 'rxjs';
import { DataPoint } from './data-point';
import { FitApiDataSourceService } from 'src/app/service/fit-data-source.service';

@Component({
    selector: 'upload-to-fit-cmp',
    templateUrl: './upload-to-fit.component.pug',
    styleUrls: ['./upload-to-fit.component.scss']
})
export class UploadToFitComponent {
    private dataPointsSubject: BehaviorSubject<DataPoint[]> = new BehaviorSubject<DataPoint[]>([]);
    private subscriptions: Subscription[] = [];
    private mNumberOfItems: number = 0;

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
