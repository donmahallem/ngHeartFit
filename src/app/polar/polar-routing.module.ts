/*!
 * Source https://github.com/donmahallem/ngHeartFit
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteGuardService } from '../service/route-guard.service';
import { UploadResolver } from './services/upload.resolver';
import { UploadComponent } from './upload/upload.component';
import { ViewUploadComponent } from './view-upload/view-upload.component';

const routes: Routes = [
    {
        canActivate: [RouteGuardService],
        component: UploadComponent,
        path: 'upload',
    },
    {
        component: ViewUploadComponent,
        path: 'view',
    },
    {
        path: '**',
        redirectTo: 'upload',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [
        RouteGuardService,
        UploadResolver,
    ],
})
export class PolarRoutingModule { }
