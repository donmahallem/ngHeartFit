import {
    Component,
    AfterViewInit,
    OnDestroy,
    NgZone,
    Input
} from '@angular/core';
import { FitApiDataSourceService, FitDataSource, FitDataSourceList } from 'src/app/service/fit-data-source.service';
import { HttpEvent } from '@angular/common/http';
import { Subscriber, Observable } from 'rxjs';
import { LoadableListComponent } from 'src/app/common-components/sessions.component';
@Component({
    selector: 'app-datasource-list',
    templateUrl: './datasource-list.component.pug',
    styleUrls: ['./datasource-list.component.scss']
})
export class DatasourceListComponent {
    private mDataSources: FitDataSource[] = [];


    public get dataSources(): FitDataSource[] {
        return this.mDataSources;
    }

    @Input('dataSources')
    public set dataSources(sources: FitDataSource[]) {
        this.mDataSources = sources;
    }
}
