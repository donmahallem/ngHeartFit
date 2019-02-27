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
export class UploadToFitComponent implements
    AfterViewInit,
    OnDestroy {
    private dataPointsSubject: BehaviorSubject<DataPoint[]> = new BehaviorSubject<DataPoint[]>([]);
    private subscriptions: Subscription[] = [];
    private numOfItems = 0;

    public get numerOfItems(): number {
        return this.numOfItems;
    }


    constructor(private fitDataSourceService: FitApiDataSourceService) {
    }

    @Input('dataPoints')
    public set dataPoints(data: DataPoint[]) {
        this.dataPointsSubject.next(data);
    }

    public get dataPoints(): DataPoint[] {
        return this.dataPointsSubject.value;
    }
    public ngAfterViewInit(): void {
        // this.idSubscription = this.router.
        this.subscriptions.push(this.dataPointsSubject.subscribe((dataPoints) => {
            this.numOfItems = dataPoints.length;
        }));
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

    public ngOnDestroy(): void {
        for (const sub of this.subscriptions) {
            sub.unsubscribe();
        }
        this.subscriptions = [];
    }
}
