import { HttpEvent } from '@angular/common/http';
import {
    Component,
    NgZone,
} from '@angular/core';
import { Observable } from 'rxjs';
import { LoadableListComponent } from 'src/app/common-components/sessions.component';
import { FitApiDataSourceService, FitDataSource, FitDataSourceList } from 'src/app/service/fit-data-source.service';
@Component({
    selector: 'app-datasources',
    templateUrl: './datasources.component.pug',
    styleUrls: ['./datasources.component.scss'],
})
export class DatasourcesComponent extends LoadableListComponent<FitDataSourceList> {
    private mDataSources: FitDataSource[] = [];
    constructor(private zone: NgZone, private nggapi: FitApiDataSourceService) {
        super();
    }

    public get dataSources(): FitDataSource[] {
        return this.mDataSources;
    }
    public onResult(result: FitDataSourceList) {
        console.log('in zone', NgZone.isInAngularZone());
        this.mDataSources = result.dataSource;
    }

    public createLoadObservable(): Observable<HttpEvent<FitDataSourceList>> {
        return this.nggapi.getDataSources();
    }
}
