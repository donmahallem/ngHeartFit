/*!
 * Source https://github.com/donmahallem/ngHeartFit
 */

import {
    Component,
    Input,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FitApiDataSourceService } from 'src/app/service/fit-data-source.service';
import { IDataPoint } from './data-point';

@Component({
    selector: 'app-upload-to-fit',
    styleUrls: ['./upload-to-fit.component.scss'],
    templateUrl: './upload-to-fit.component.pug',
})
export class UploadToFitComponent {
    private dataPointsSubject: BehaviorSubject<IDataPoint[]> = new BehaviorSubject<IDataPoint[]>([]);
    private mNumberOfItems = 0;

    constructor(private fitDataSourceService: FitApiDataSourceService) {
    }

    public get dataPoints(): IDataPoint[] {
        return this.dataPointsSubject.value;
    }

    @Input('dataPoints')
    public set dataPoints(data: IDataPoint[]) {
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

    public uploadData(): void {
        this.fitDataSourceService.getDataSources()
            // tslint:disable-next-line:no-console
            .subscribe(console.log, console.error);
    }
    public createDatasource(): void {
        this.fitDataSourceService.createDataSource(undefined)
            // tslint:disable-next-line:no-console
            .subscribe(console.log, console.error);
    }
    public sendData(): void {
    }

}
