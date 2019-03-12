import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatProgressBarModule, MatTableModule, MatIconModule } from "@angular/material";
import { DatasourceDetailComponent } from "./datasource-detail.component";
import { FitDataSourceDetailResolver } from "./fit-data-source-detail.resolver";


@NgModule({
    imports: [
        CommonModule,
        MatProgressBarModule,
        MatTableModule,
        MatIconModule
    ],
    declarations: [
        DatasourceDetailComponent
    ],
    exports: [
        DatasourceDetailComponent,
        CommonModule,
        MatProgressBarModule,
        MatTableModule,
        MatIconModule
    ],
    providers: [
        FitDataSourceDetailResolver
    ]
})
export class DatasourceDetailModule { }