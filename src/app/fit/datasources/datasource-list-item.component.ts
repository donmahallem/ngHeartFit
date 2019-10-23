/*!
 * Source https://github.com/donmahallem/ngHeartFit
 */

import {
    Component,
    HostListener,
    Input,
} from '@angular/core';
import { Router } from '@angular/router';
import { IFitDataSource } from 'src/app/service/fit-data-source.service';
@Component({
    selector: 'app-datasource-li',
    styleUrls: ['./datasource-list-item.component.scss'],
    templateUrl: './datasource-list-item.component.pug',
})
export class DatasourceListItemComponent {
    private mDataSource: IFitDataSource;
    constructor(private router: Router) {
    }

    @Input('dataSource')
    public set dataSource(source: IFitDataSource) {
        this.mDataSource = source;
    }

    public get dataSource(): IFitDataSource {
        return this.mDataSource;
    }

    @HostListener('click', ['$event'])
    public onHostClicked(event: MouseEvent): void {
        this.router.navigate(['/fit/datasource', this.dataSource.dataStreamId]);
    }
}
