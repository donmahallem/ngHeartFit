import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatProgressBarModule, MatTableModule, MatIconModule, MatToolbarModule } from "@angular/material";
import { FitDashboardComponent } from "./fit-dashboard.component";
import { LineChartModule } from "src/app/common-components/line-chart";


@NgModule({
    imports: [
        CommonModule,
        MatProgressBarModule,
        MatTableModule,
        MatIconModule,
        MatToolbarModule,
        LineChartModule
    ],
    declarations: [
        FitDashboardComponent
    ],
    exports: [
        FitDashboardComponent,
        CommonModule,
        MatProgressBarModule,
        MatTableModule,
        MatIconModule,
        MatToolbarModule,
        LineChartModule
    ],
    providers: [
    ]
})
export class FitDashboardModule { }