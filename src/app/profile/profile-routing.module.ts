/*!
 * Source https://github.com/donmahallem/ngHeartFit
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteGuardService } from '../service/route-guard.service';
import { ProfileComponent } from './components';

const routes: Routes = [
    {
        path: '',
        component: ProfileComponent,
        canActivate: [RouteGuardService],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [
        RouteGuardService,
    ],
})
export class ProfileRoutingModule { }
