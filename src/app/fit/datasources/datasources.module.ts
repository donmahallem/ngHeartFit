import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DatasourceListComponent } from "./datasource-list.component";
import { DatasourceListItemComponent } from "./datasource-list-item.component";
import { DatasourcesComponent } from "./datasources.component";
import { MatProgressBarModule } from "@angular/material";


@NgModule({
    imports: [CommonModule,
        MatProgressBarModule
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
        MatProgressBarModule
    ]
})
export class DatasourcesModule { }