import {
    Component,
    AfterViewInit,
    OnDestroy,
    Input,
    HostListener
} from '@angular/core';
import { FitDataSource } from 'src/app/service/fit-data-source.service';
import { Router } from '@angular/router';
@Component({
    selector: 'app-datasource-li',
    templateUrl: './datasource-list-item.component.pug',
    styleUrls: ['./datasource-list-item.component.scss']
})
export class DatasourceListItemComponent {
    private mDataSource: FitDataSource;
    constructor(private router: Router) {
    }

    @Input('dataSource')
    public set dataSource(source: FitDataSource) {
        this.mDataSource = source;
    }

    public get dataSource(): FitDataSource {
        return this.mDataSource;
    }

    @HostListener('click', ['$event'])
    public onHostClicked(event: MouseEvent): void {
        this.router.navigate(['/fit/datasource', this.dataSource.dataStreamId]);
    }
}
