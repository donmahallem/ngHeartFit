/*!
 * Source https://github.com/donmahallem/ngHeartFit
 */

import { HttpEvent } from '@angular/common/http';
import {
    Component,
    NgZone,
} from '@angular/core';
import { Observable } from 'rxjs';
import { LoadableListComponent } from 'src/app/common-components/sessions.component';
import { FitApiDataSourceService, IFitDataSource, IFitDataSourceList } from 'src/app/service/fit-data-source.service';
@Component({
    selector: 'app-datasources',
    templateUrl: './datasources.component.pug',
    styleUrls: ['./datasources.component.scss'],
})
export class DatasourcesComponent extends LoadableListComponent<IFitDataSourceList> {
    private mDataSources: IFitDataSource[] = [];
    constructor(private zone: NgZone, private nggapi: FitApiDataSourceService) {
        super();
    }

    public get dataSources(): IFitDataSource[] {
        return this.mDataSources;
    }
    public onResult(result: IFitDataSourceList) {
        console.log('in zone', NgZone.isInAngularZone());
        this.mDataSources = result.dataSource;
    }

    public createLoadObservable(): Observable<HttpEvent<IFitDataSourceList>> {
        return this.nggapi.getDataSources();
    }
}
