import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DatasourcesComponent } from './datasources/datasources.component';
import { DatasourceDetailComponent } from './datasources/datasource-detail.component';
import { SessionsComponent } from './sessions/sessions.component';
import { SessionDetailComponent } from './session-detail/session-detail.component';

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
