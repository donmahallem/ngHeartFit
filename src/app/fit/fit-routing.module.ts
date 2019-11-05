/*!
 * Source https://github.com/donmahallem/ngHeartFit
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DatasourceDetailComponent } from './datasource-detail';
import { FitDataSourceDetailResolver } from './datasource-detail/fit-data-source-detail.resolver';
import { DatasourcesComponent } from './datasources/datasources.component';
import { FitDashboardComponent } from './fit-dashboard';
import { SessionDetailComponent } from './session-detail/session-detail.component';
import { SessionResolver } from './sessions/session.resolver';
import { SessionsComponent } from './sessions/sessions.component';
import { SessionsResolver } from './sessions/sessions.resolver';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
    },
    {
        component: FitDashboardComponent,
        path: 'dashboard',
    },
    {
        component: DatasourcesComponent,
        path: 'datasources',
    },
    {
        component: DatasourceDetailComponent,
        path: 'datasource/:id',
        resolve: {
            dataSource: FitDataSourceDetailResolver,
        },
    },
    {
        component: SessionsComponent,
        path: 'sessions',
        resolve: {
            sessions: SessionsResolver,
        },
    },
    {
        component: SessionDetailComponent,
        path: 'session/:id/:from/:to',
        resolve: {
            session: SessionResolver,
        },
    },
];

@NgModule({
    exports: [RouterModule],
    imports: [
        RouterModule.forChild(routes),
    ],
    providers: [
    ],
})
export class FitRoutingModule { }
