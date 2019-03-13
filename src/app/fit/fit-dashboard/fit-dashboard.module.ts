import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatProgressBarModule, MatTableModule, MatIconModule, MatToolbarModule } from "@angular/material";
import { FitDashboardComponent } from "./fit-dashboard.component";


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
    ],
    exports: [
        FitDashboardComponent,
        CommonModule,
        MatProgressBarModule,
        MatTableModule,
        MatIconModule,
        MatToolbarModule
    ],
    providers: [
    ]
})
export class FitDashboardModule { }