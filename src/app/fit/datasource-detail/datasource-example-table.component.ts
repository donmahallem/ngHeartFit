import {
    Component,
    AfterViewInit,
    OnDestroy,
    NgZone,
    OnInit,
    Input
} from '@angular/core';
import { Subscription, Observable, BehaviorSubject } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { flatMap, debounceTime } from 'rxjs/operators';
import * as moment from 'moment';
import { FitDataSource, FitApiDataSourceService } from 'src/app/service/fit-data-source.service';
import { FitApiDataSetService, FitDatasetResponse, FitDatasetPoints } from 'src/app/service/fit-data-set.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { MatProgressBar } from '@angular/material';
import { LoadableListComponent } from 'src/app/common-components/sessions.component';
import { LoadableComponent } from 'src/app/common-components/loadable.component';



@Component({
    selector: 'datasource-example-table',
    templateUrl: './datasource-example-table.component.pug',
    styleUrls: ['./datasource-example-table.component.scss']
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
                    .map((val) => {
                        return val.name;
                    }));
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
        for (let a of result.point) {
            res.push({
                startTime: moment.unix(parseInt(a.startTimeNanos.substr(0, a.startTimeNanos.length - 9))),
                endTime: moment.unix(parseInt(a.endTimeNanos.substr(0, a.endTimeNanos.length - 9))),
                modifiedTime: moment.unix(parseInt(a.modifiedTimeMillis.substr(0, a.modifiedTimeMillis.length - 3))),
                weight: a.value[0].fpVal
            })
        }
        this.dataSource2 = res;
    }
    public createLoadObservable(): Observable<HttpEvent<FitDatasetResponse<FitDatasetPoints>>> {
        return this.activatedRoute
            .paramMap
            .pipe(flatMap((value: ParamMap): Observable<HttpEvent<FitDatasetResponse<FitDatasetPoints>>> => {
                return this.fitDataSetService.getDataSetData(value.get('id'), moment().subtract(30, 'day'), moment());
            }));
    };

    public get progressBarMode(): 'indeterminate' | 'query' {
        return 'query';
    }

    public ngOnDestroy() {
        if (this.mRouteDataSubscription) {
            this.mRouteDataSubscription.unsubscribe();
        }
    }
}
