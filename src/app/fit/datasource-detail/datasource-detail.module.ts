import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatProgressBarModule, MatTableModule, MatIconModule } from "@angular/material";
import { DatasourceDetailComponent } from "./datasource-detail.component";


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
    ]
})
export class DatasourceDetailModule { }