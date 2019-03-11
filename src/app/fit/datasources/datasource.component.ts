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
    selector: 'datasource',
    templateUrl: './datasource.component.pug',
    styleUrls: ['./datasource.component.scss']
})
export class DatasourceComponent {
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
