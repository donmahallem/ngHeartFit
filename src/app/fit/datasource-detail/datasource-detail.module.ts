/*!
 * Source https://github.com/donmahallem/ngHeartFit
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DatasourceDetailComponent } from './datasource-detail.component';
import { DatasourceExampleTableComponent } from './datasource-example-table.component';
import { FitDataSourceDetailResolver } from './fit-data-source-detail.resolver';

@NgModule({
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
    imports: [
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
