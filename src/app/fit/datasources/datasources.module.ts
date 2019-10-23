import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule, MatProgressBarModule } from '@angular/material';
import { DatasourceListItemComponent } from './datasource-list-item.component';
import { DatasourceListComponent } from './datasource-list.component';
import { DatasourcesComponent } from './datasources.component';

@NgModule({
    imports: [
        CommonModule,
        MatProgressBarModule,
        MatIconModule,
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
        MatIconModule,
    ],
})
export class DatasourcesModule { }
