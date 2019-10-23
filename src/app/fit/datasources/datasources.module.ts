/*!
 * Source https://github.com/donmahallem/ngHeartFit
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule, MatProgressBarModule } from '@angular/material';
import { DatasourceListItemComponent } from './datasource-list-item.component';
import { DatasourceListComponent } from './datasource-list.component';
import { DatasourcesComponent } from './datasources.component';

@NgModule({
    declarations: [
        DatasourcesComponent,
        DatasourceListItemComponent,
        DatasourceListComponent],
    exports: [
        DatasourcesComponent,
        DatasourceListItemComponent,
        DatasourceListComponent,
        CommonModule,
        MatProgressBarModule,
        MatIconModule,
    ],
    imports: [
        CommonModule,
        MatProgressBarModule,
        MatIconModule,
    ],
})
export class DatasourcesModule { }
