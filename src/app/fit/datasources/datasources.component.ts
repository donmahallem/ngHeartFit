/*!
 * Source https://github.com/donmahallem/ngHeartFit
 */

import { HttpEvent } from '@angular/common/http';
import {
    Component,
} from '@angular/core';
import { IFitDataSource } from '@donmahallem/google-fit-api-types';
import { Observable } from 'rxjs';
import { LoadableListComponent } from 'src/app/common-components/sessions.component';
import { FitApiDataSourceService, IFitDataSourceList } from 'src/app/service/fit-data-source.service';
@Component({
    selector: 'app-datasources',
    styleUrls: ['./datasources.component.scss'],
    templateUrl: './datasources.component.pug',
})
export class DatasourcesComponent extends LoadableListComponent<IFitDataSourceList> {
    private mDataSources: IFitDataSource[] = [];
    constructor(private nggapi: FitApiDataSourceService) {
        super();
    }

    public get dataSources(): IFitDataSource[] {
        return this.mDataSources;
    }
    public onResult(result: IFitDataSourceList) {
        this.mDataSources = result.dataSource;
    }

    public createLoadObservable(): Observable<HttpEvent<IFitDataSourceList>> {
        return this.nggapi.getDataSources();
    }
}
