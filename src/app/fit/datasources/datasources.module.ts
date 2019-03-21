import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatasourceListComponent } from './datasource-list.component';
import { DatasourceListItemComponent } from './datasource-list-item.component';
import { DatasourcesComponent } from './datasources.component';
import { MatProgressBarModule, MatIconModule } from '@angular/material';


@NgModule({
    imports: [
        CommonModule,
        MatProgressBarModule,
        MatIconModule
    ],
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
        MatIconModule
    ]
})
export class DatasourcesModule { }
