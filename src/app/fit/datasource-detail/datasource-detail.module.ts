/*!
 * Source https://github.com/donmahallem/ngHeartFit
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule, MatProgressBarModule, MatTableModule, MatToolbarModule } from '@angular/material';
import { DatasourceDetailComponent } from './datasource-detail.component';
import { DatasourceExampleTableComponent } from './datasource-example-table.component';
import { FitDataSourceDetailResolver } from './fit-data-source-detail.resolver';

@NgModule({
    imports: [
        CommonModule,
        MatProgressBarModule,
        MatTableModule,
        MatIconModule,
        MatToolbarModule,
    ],
    declarations: [
        DatasourceDetailComponent,
        DatasourceExampleTableComponent,
    ],
    exports: [
        DatasourceDetailComponent,
        DatasourceExampleTableComponent,
        CommonModule,
        MatProgressBarModule,
        MatTableModule,
        MatIconModule,
        MatToolbarModule,
    ],
    providers: [
        FitDataSourceDetailResolver,
    ],
})
export class DatasourceDetailModule { }
