import {
    Component,
    AfterViewInit,
    OnDestroy,
    NgZone,
    OnInit
} from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { flatMap, debounceTime } from 'rxjs/operators';
import * as moment from 'moment';
import { FitDataSource, FitApiDataSourceService } from 'src/app/service/fit-data-source.service';
import { FitApiDataSetService } from 'src/app/service/fit-data-set.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { MatProgressBar } from '@angular/material';


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
export class DatasourceDetailComponent implements OnDestroy, AfterViewInit, OnInit {

    displayedColumns: string[] = ['position', 'name'];
    dataSource2 = ELEMENT_DATA;
    private mDataSource: FitDataSource = null;
    private mRouteDataSubscription: Subscription;
    constructor(private zone: NgZone,
        private fitDataSetService: FitApiDataSetService,
        private activatedRoute: ActivatedRoute) {
    }

    public get dataSource(): FitDataSource {
        return this.mDataSource;
    }

    public get hasDataSource(): boolean {
        return (typeof this.mDataSource !== 'undefined');
    }

    public ngOnInit() {
        this.mRouteDataSubscription = this.activatedRoute.data
            .subscribe((data: { dataSource: FitDataSource }) => {
                this.zone.run(() => {
                    this.mDataSource = data.dataSource;
                });
            });
        this.activatedRoute
            .paramMap
            .pipe(flatMap((value) => {
                return this.fitDataSetService.getDataSetData(value.get('id'), moment().subtract(30, 'day'), moment());
            })).subscribe(console.log, console.error);
    }
    public ngAfterViewInit() {
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