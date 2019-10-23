import { HttpEvent } from '@angular/common/http';
import {
    Component,
    Input,
    NgZone,
} from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import * as moment from 'moment';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { LoadableComponent } from 'src/app/common-components/loadable.component';
import { FitApiDataSetService, FitDatasetPoints, FitDatasetResponse } from 'src/app/service/fit-data-set.service';
import { FitDataSource } from 'src/app/service/fit-data-source.service';

@Component({
    selector: 'datasource-example-table',
    templateUrl: './datasource-example-table.component.pug',
    styleUrls: ['./datasource-example-table.component.scss'],
})
export class DatasourceExampleTableComponent<T> extends LoadableComponent<FitDatasetResponse<FitDatasetPoints>> {

    displayedColumns: string[] = ['position', 'name', 'date'];
    dataSource2: any = [];
    private mDataSourceSubject: BehaviorSubject<FitDataSource> = new BehaviorSubject(null);
    private mRouteDataSubscription: Subscription;
    constructor(private zone: NgZone,
                private fitDataSetService: FitApiDataSetService,
                private activatedRoute: ActivatedRoute) {
        super();
        this.mDataSourceSubject.subscribe((val) => {
            if (val) {
                const vals: string[] = ['startTime', 'endTime', 'modifiedTime'].concat(val.dataType.field
                    .map((val) =>
                        val.name));
                this.displayedColumns = vals;
                return;
            }
            this.displayedColumns = ['startTime', 'endTime', 'modifiedTime'];
        });
    }

    public get dataSource(): FitDataSource {
        return this.mDataSourceSubject.value;
    }

    @Input('dataSource')
    public set dataSource(source: FitDataSource) {
        this.mDataSourceSubject.next(source);
    }
    public onResult(result: FitDatasetResponse<FitDatasetPoints>) {
        const res: any[] = [];
        for (const a of result.point) {
            res.push({
                startTime: moment.unix(parseInt(a.startTimeNanos.substr(0, a.startTimeNanos.length - 9), 10)),
                endTime: moment.unix(parseInt(a.endTimeNanos.substr(0, a.endTimeNanos.length - 9), 10)),
                modifiedTime: moment.unix(parseInt(a.modifiedTimeMillis.substr(0, a.modifiedTimeMillis.length - 3), 10)),
                weight: a.value[0].fpVal,
            });
        }
        this.dataSource2 = res;
    }
    public createLoadObservable(): Observable<HttpEvent<FitDatasetResponse<FitDatasetPoints>>> {
        return this.activatedRoute
            .paramMap
            .pipe(flatMap((value: ParamMap): Observable<HttpEvent<FitDatasetResponse<FitDatasetPoints>>> =>
                this.fitDataSetService.getDataSetData(value.get('id'), moment().subtract(30, 'day'), moment())));
    }

    public get progressBarMode(): 'indeterminate' | 'query' {
        return 'query';
    }

    public ngOnDestroy() {
        if (this.mRouteDataSubscription) {
            this.mRouteDataSubscription.unsubscribe();
        }
    }
}
