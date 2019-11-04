/*!
 * Source https://github.com/donmahallem/ngHeartFit
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BodyMetricsFormComponent } from './components/bodymetrics-form.component';
import { WeightChartComponent } from './components/weight-chart.component';

const routes: Routes = [
    {
        component: BodyMetricsFormComponent,
        path: 'insert',
    },
    {
        component: WeightChartComponent,
        path: 'weight/chart',
    },
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)],
    providers: [
    ],
})
export class BodyMetricsRoutingModule { }
