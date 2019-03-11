import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGoogleComponent } from './components/login-google/login-google.component';
import { RouteGuardService } from './service/route-guard.service';
import { NotFoundComponent } from './not-found.component';
import { NotFoundModule } from './not-found.module';

const routes: Routes = [
    {
        path: 'polar',
        data: {
            requiresLogin: true
        },
        loadChildren: './polar/polar.module#PolarModule'
    }, {
        path: 'profile',
        data: {
            requiresLogin: true
        },
        loadChildren: './profile/profile.module#ProfileModule'
    }, {
        path: 'fit',
        data: {
            requiresLogin: true
        },
        loadChildren: './fit/fit.module#FitModule'
    }, {
        path: 'bodymetrics',
        data: {
            requiresLogin: true
        },
        // canLoad: [RouteGuardService],
        canActivate: [RouteGuardService],
        canActivateChild: [RouteGuardService],
        loadChildren: './bodymetrics/bodymetrics.module#BodyMetricsModule'
    }, {
        path: 'login',
        children: [
            {
                path: 'google',
                component: LoginGoogleComponent,
                children: [
                    {
                        path: 'callback',
                        children: []
                    }
                ]
            },
            {
                path: 'polarflow',
                children: []
            }
        ]
    }, {
        path: '**',
        component: NotFoundComponent
    }
];

@NgModule({
    imports: [
        RouterModule
            .forRoot(routes, { enableTracing: false }),
        NotFoundModule
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
