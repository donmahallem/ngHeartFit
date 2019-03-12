import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatProgressBarModule, MatTableModule, MatIconModule, MatToolbarModule } from "@angular/material";
import { DatasourceDetailComponent } from "./datasource-detail.component";
import { FitDataSourceDetailResolver } from "./fit-data-source-detail.resolver";
import { DatasourceExampleTableComponent } from "./datasource-example-table.component";


@NgModule({
    imports: [
        CommonModule,
        MatProgressBarModule,
        MatTableModule,
        MatIconModule,
        MatToolbarModule
    ],
    declarations: [
        DatasourceDetailComponent,
        DatasourceExampleTableComponent
    ],
    exports: [
        DatasourceDetailComponent,
        DatasourceExampleTableComponent,
        CommonModule,
        MatProgressBarModule,
        MatTableModule,
        MatIconModule,
        MatToolbarModule
    ],
    providers: [
        FitDataSourceDetailResolver
    ]
})
export class DatasourceDetailModule { }