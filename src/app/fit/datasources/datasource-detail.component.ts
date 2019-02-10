import {
    Component,
    OnInit,
    ViewChild,
    AfterViewInit,
    OnDestroy,
    ChangeDetectorRef
} from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { GapiUserService } from 'src/app/service/gapi-user.service';
import { FitApiService } from 'src/app/service/fit-api.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DataSourceInformation } from 'src/app/service/fit-api-modals';
import { flatMap } from 'rxjs/operators';
import * as moment from 'moment';


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
    selector: 'datasource-detail',
    templateUrl: './datasource-detail.component.pug',
    styleUrls: ['./datasource-detail.component.scss']
})
export class DatasourceDetailComponent implements OnDestroy, AfterViewInit {

    displayedColumns: string[] = ['position', 'name'];
    dataSource2 = ELEMENT_DATA;
    private mDataSource: DataSourceInformation = null;
    private mSubscriptions: Subscription[] = [];
    constructor(private nggapi: FitApiService,
        private activatedRoute: ActivatedRoute) {
    }

    public get dataSource(): DataSourceInformation {
        return this.mDataSource;
    }

    public ngAfterViewInit() {
        this.activatedRoute
            .paramMap
            .pipe(flatMap((params: ParamMap): Observable<DataSourceInformation> => {
                console.log(params);
                return this.nggapi.getDataSource(params.get('id'));
            })).subscribe((dataSource) => {
                this.mDataSource = dataSource;
                const cols: string[] = dataSource.dataType.field.map((val) => {
                    return val.name;
                });
                this.displayedColumns = ['date'].concat(cols);
            }, console.error);

        this.activatedRoute
            .paramMap
            .pipe(flatMap((value) => {
                return this.nggapi.getDataPointsFromDataSource(value.get('id'), moment().subtract(30, 'day'), moment());
            })).subscribe(console.log, console.error);
    }

    public ngOnDestroy() {
    }
}
