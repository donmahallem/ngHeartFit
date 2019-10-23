/*!
 * Source https://github.com/donmahallem/ngHeartFit
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGoogleComponent } from './components/login-google/login-google.component';
import { NgGapiResolver } from './gapi.resolver';
import { NotFoundComponent } from './not-found.component';
import { NotFoundModule } from './not-found.module';
import { RouteGuardService } from './service/route-guard.service';

const routes: Routes = [
    {
        data: {
            requiresLogin: true,
        },
        loadChildren: './polar/polar.module#PolarModule',
        path: 'polar',
    }, {
        data: {
            requiresLogin: true,
        },
        loadChildren: './profile/profile.module#ProfileModule',
        path: 'profile',
    }, {
        canActivate: [RouteGuardService],
        canActivateChild: [RouteGuardService],
        data: {
            requiresLogin: true,
        },
        loadChildren: './fit/fit.module#FitModule',
        path: 'fit',
        resolve: {
            gapi: NgGapiResolver,
        },
    }, {
        canActivate: [RouteGuardService],
        canActivateChild: [RouteGuardService],
        data: {
            requiresLogin: true,
        },
        // canLoad: [RouteGuardService],
        loadChildren: './bodymetrics/bodymetrics.module#BodyMetricsModule',
        path: 'bodymetrics',
    }, {
        children: [
            {
                children: [
                    {
                        children: [],
                        path: 'callback',
                    },
                ],
                component: LoginGoogleComponent,
                path: 'google',
            },
            {
                children: [],
                path: 'polarflow',
            },
        ],
        path: 'login',
    }, {
        component: NotFoundComponent,
        path: '**',
    },
];

@NgModule({
    exports: [RouterModule],
    imports: [
        RouterModule
            .forRoot(routes, { enableTracing: false }),
        NotFoundModule,
    ],
})
export class AppRoutingModule { }
