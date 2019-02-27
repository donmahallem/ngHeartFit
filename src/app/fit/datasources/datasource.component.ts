import {
    Component,
    AfterViewInit,
    OnDestroy,
    Input
} from '@angular/core';
import { FitDataSource } from 'src/app/service/fit-data-source.service';
@Component({
    selector: 'datasource',
    templateUrl: './datasource.component.pug',
    styleUrls: ['./datasource.component.scss']
})
export class DatasourceComponent implements OnDestroy, AfterViewInit {
    private mDataSource: FitDataSource;
    constructor() {
    }

    @Input('dataSource')
    public set dataSource(source: FitDataSource) {
        this.mDataSource = source;
    }

    public get dataSource(): FitDataSource {
        return this.mDataSource;
    }

    public ngAfterViewInit() {
    }

    public ngOnDestroy() {
    }
}
