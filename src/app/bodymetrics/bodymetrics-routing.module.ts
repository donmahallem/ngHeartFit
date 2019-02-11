import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BodyMetricsFormComponent } from './components/bodymetrics-form.component';
import { WeightChartComponent } from './components/weight-chart.component';

const routes: Routes = [
    {
        path: "insert",
        component: BodyMetricsFormComponent
    },
    {
        path: 'weight/chart',
        component: WeightChartComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [
    ]
})
export class BodyMetricsRoutingModule { }
