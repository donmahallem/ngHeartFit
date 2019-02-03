import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BodyMetricsFormComponent } from './components/bodymetrics-form.component';

const routes: Routes = [
    {
        path: "insert",
        component: BodyMetricsFormComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [
    ]
})
export class BodyMetricsRoutingModule { }
