import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DatasourcesComponent } from './datasources/datasources.component';
import { SessionsComponent } from './sessions/sessions.component';
import { SessionDetailComponent } from './session-detail/session-detail.component';
import { DatasourceDetailComponent } from './datasource-detail';

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
    },
    {
        path: 'session/:id',
        component: SessionDetailComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [
    ]
})
export class FitRoutingModule { }
