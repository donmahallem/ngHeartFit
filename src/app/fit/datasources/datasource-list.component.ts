/*!
 * Source https://github.com/donmahallem/ngHeartFit
 */

import {
    Component,
    Input,
} from '@angular/core';
import { IFitDataSource } from 'src/app/service/fit-data-source.service';
@Component({
    selector: 'app-datasource-list',
    templateUrl: './datasource-list.component.pug',
    styleUrls: ['./datasource-list.component.scss'],
})
export class DatasourceListComponent {
    private mDataSources: IFitDataSource[] = [];

    public get dataSources(): IFitDataSource[] {
        return this.mDataSources;
    }

    @Input('dataSources')
    public set dataSources(sources: IFitDataSource[]) {
        this.mDataSources = sources;
    }
}
