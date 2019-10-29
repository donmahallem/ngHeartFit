/*!
 * Source https://github.com/donmahallem/ngHeartFit
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteGuardService } from '../service/route-guard.service';
import { ProfileComponent } from './components';

const routes: Routes = [
    {
        canActivate: [RouteGuardService],
        component: ProfileComponent,
        path: '',
    },
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)],
    providers: [
        RouteGuardService,
    ],
})
export class ProfileRoutingModule { }
