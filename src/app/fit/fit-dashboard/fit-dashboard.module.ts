import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatProgressBarModule, MatTableModule, MatIconModule, MatToolbarModule } from "@angular/material";
import { FitDashboardComponent } from "./fit-dashboard.component";
import { LineChartComponent } from "src/app/common-components/line-chart.component";


@NgModule({
    imports: [
        CommonModule,
        MatProgressBarModule,
        MatTableModule,
        MatIconModule,
        MatToolbarModule
    ],
    declarations: [
        FitDashboardComponent,
        LineChartComponent
    ],
    exports: [
        FitDashboardComponent,
        CommonModule,
        MatProgressBarModule,
        MatTableModule,
        MatIconModule,
        MatToolbarModule,
        LineChartComponent
    ],
    providers: [
    ]
})
export class FitDashboardModule { }