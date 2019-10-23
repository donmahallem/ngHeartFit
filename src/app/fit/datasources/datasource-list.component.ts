import {
    Component,
    Input,
} from '@angular/core';
import { FitDataSource } from 'src/app/service/fit-data-source.service';
@Component({
    selector: 'app-datasource-list',
    templateUrl: './datasource-list.component.pug',
    styleUrls: ['./datasource-list.component.scss'],
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
