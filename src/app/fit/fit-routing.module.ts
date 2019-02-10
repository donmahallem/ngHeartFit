import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DatasourcesComponent } from './datasources/datasources.component';
import { DatasourceDetailComponent } from './datasources/datasource-detail.component';
import { SessionsComponent } from './sessions/sessions.component';

const routes: Routes = [
    {
        path: 'datasources',
        component: DatasourcesComponent
    },
    {
        path: 'datasource/:id',
        component: DatasourceDetailComponent
    },
    {
        path: 'sessions',
        component: SessionsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [
    ]
})
export class FitRoutingModule { }
