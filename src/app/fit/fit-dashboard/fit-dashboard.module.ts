/*!
 * Source https://github.com/donmahallem/ngHeartFit
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule, MatProgressBarModule, MatTableModule, MatToolbarModule } from '@angular/material';
import { LineChartModule } from 'src/app/common-components/line-chart';
import { FitDashboardComponent } from './fit-dashboard.component';

@NgModule({
    imports: [
        CommonModule,
        MatProgressBarModule,
        MatTableModule,
        MatIconModule,
        MatToolbarModule,
        LineChartModule,
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
        MatToolbarModule,
        LineChartModule,
    ],
    providers: [
    ],
})
export class FitDashboardModule { }
