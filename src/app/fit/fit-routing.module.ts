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
    },
    {
        component: SessionDetailComponent,
        path: 'session/:id',
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
