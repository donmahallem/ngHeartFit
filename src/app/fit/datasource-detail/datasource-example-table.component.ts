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


const ELEMENT_DATA: any[] = [
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
    { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
    { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
    { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
    { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
    { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
    { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
    { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
    { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
    selector: 'datasource-example-table',
    templateUrl: './datasource-example-table.component.pug',
    styleUrls: ['./datasource-example-table.component.scss']
})
export class DatasourceExampleTableComponent<T> extends LoadableComponent<FitDatasetResponse<FitDatasetPoints>> {

    displayedColumns: string[] = ['position', 'name', 'date'];
    dataSource2 = ELEMENT_DATA;
    private mDataSourceSubject: BehaviorSubject<FitDataSource> = new BehaviorSubject(null);
    private mRouteDataSubscription: Subscription;
    constructor(private zone: NgZone,
        private fitDataSetService: FitApiDataSetService,
        private activatedRoute: ActivatedRoute) {
        super();
        this.mDataSourceSubject.subscribe((val) => {
            const vals: string[] = val.dataType.field
                .map((val) => {
                    return val.name;
                });
            this.displayedColumns.concat(vals)
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
        console.log("rekanrf", result);
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
