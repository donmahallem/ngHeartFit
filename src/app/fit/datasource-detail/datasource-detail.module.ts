import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatProgressBarModule, MatTableModule } from "@angular/material";
import { DatasourceDetailComponent } from "./datasource-detail.component";


@NgModule({
    imports: [
        CommonModule,
        MatProgressBarModule,
        MatTableModule
    ],
    declarations: [
        DatasourceDetailComponent
    ],
    exports: [
        DatasourceDetailComponent,
        CommonModule,
        MatProgressBarModule,
        MatTableModule
    ]
})
export class DatasourceDetailModule { }