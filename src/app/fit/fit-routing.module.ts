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
import { SessionsComponent } from './sessions/sessions.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
    },
    {
        path: 'dashboard',
        component: FitDashboardComponent,
    },
    {
        path: 'datasources',
        component: DatasourcesComponent,
    },
    {
        path: 'datasource/:id',
        component: DatasourceDetailComponent,
        resolve: {
            dataSource: FitDataSourceDetailResolver,
        },
    },
    {
        path: 'sessions',
        component: SessionsComponent,
    },
    {
        path: 'session/:id',
        component: SessionDetailComponent,
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [RouterModule],
    providers: [
    ],
})
export class FitRoutingModule { }
