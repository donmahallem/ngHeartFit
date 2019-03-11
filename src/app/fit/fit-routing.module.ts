import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DatasourcesComponent } from './datasources/datasources.component';
import { SessionsComponent } from './sessions/sessions.component';
import { SessionDetailComponent } from './session-detail/session-detail.component';
import { DatasourceDetailComponent } from './datasource-detail';
import { NotFoundComponent } from '../not-found.component';
import { NotFoundModule } from '../not-found.module';

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
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        NotFoundModule
    ],
    exports: [RouterModule],
    providers: [
    ]
})
export class FitRoutingModule { }
