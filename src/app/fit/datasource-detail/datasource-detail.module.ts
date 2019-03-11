import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatProgressBarModule } from "@angular/material";
import { DatasourceDetailComponent } from "./datasource-detail.component";


@NgModule({
    imports: [
        CommonModule,
        MatProgressBarModule
    ],
    declarations: [
        DatasourceDetailComponent
    ],
    exports: [
        DatasourceDetailComponent,
        CommonModule,
        MatProgressBarModule
    ]
})
export class DatasourceDetailModule { }