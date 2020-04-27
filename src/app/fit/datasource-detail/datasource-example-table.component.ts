/*!
 * Source https://github.com/donmahallem/ngHeartFit
 */

import { HttpEvent } from '@angular/common/http';
import {
    Component,
    Input,
    OnDestroy,
} from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { IFitDataset, IFitDataSource, IFitFpVal } from '@donmahallem/google-fit-api-types';
import * as moment from 'moment';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { LoadableComponent } from 'src/app/common-components/loadable.component';
import { FitApiDataSetService } from 'src/app/service';
import { Momentary } from 'src/app/util';

@Component({
    selector: 'app-datasource-example-table',
    styleUrls: ['./datasource-example-table.component.scss'],
    templateUrl: './datasource-example-table.component.pug',
})
export class DatasourceExampleTableComponent<T>
    extends LoadableComponent<IFitDataset>
    implements OnDestroy {

    displayedColumns: string[] = ['position', 'name', 'date'];
    dataSource2: any = [];
    private mDataSourceSubject: BehaviorSubject<IFitDataSource> = new BehaviorSubject(undefined);
    private mRouteDataSubscription: Subscription;
    constructor(private fitDataSetService: FitApiDataSetService,
                private activatedRoute: ActivatedRoute) {
        super();
        this.mDataSourceSubject.subscribe((val) => {
            if (val) {
                const vals: string[] = ['startTime', 'endTime', 'modifiedTime'].concat(val.dataType.field
                    .map((innerVal) =>
                        innerVal.name));
                this.displayedColumns = vals;
                return;
            }
            this.displayedColumns = ['startTime', 'endTime', 'modifiedTime'];
        });
    }

    public get dataSource(): IFitDataSource {
        return this.mDataSourceSubject.value;
    }

    @Input('dataSource')
    public set dataSource(source: IFitDataSource) {
        this.mDataSourceSubject.next(source);
    }

    public get progressBarMode(): 'indeterminate' | 'query' {
        return 'query';
    }
    public onResult(result: IFitDataset) {
        const res: any[] = [];
        for (const a of result.point) {
            res.push({
                endTime: Momentary.convertNanosToMoment(a.endTimeNanos),
                modifiedTime: Momentary.convertNanosToMoment(a.modifiedTimeMillis),
                startTime: Momentary.convertMillisToMoment(a.startTimeNanos),
                weight: (a.value[0] as IFitFpVal).fpVal,
            });
        }
        this.dataSource2 = res;
    }
    public createLoadObservable(): Observable<HttpEvent<IFitDataset>> {
        return this.activatedRoute
            .paramMap
            .pipe(flatMap((value: ParamMap): Observable<HttpEvent<IFitDataset>> =>
                this.fitDataSetService.getDataSetData(value.get('id'), moment().subtract(30, 'day'), moment())));
    }

    public ngOnDestroy() {
        if (this.mRouteDataSubscription) {
            this.mRouteDataSubscription.unsubscribe();
        }
    }
}
