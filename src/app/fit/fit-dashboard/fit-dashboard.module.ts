/*!
 * Source https://github.com/donmahallem/ngHeartFit
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LineChartModule } from 'src/app/common-components/line-chart';
import { FitDashboardComponent } from './fit-dashboard.component';
import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
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
    imports: [
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
