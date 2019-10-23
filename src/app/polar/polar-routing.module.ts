import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteGuardService } from '../service/route-guard.service';
import { UploadResolver } from './services/upload.resolver';
import { UploadComponent } from './upload/upload.component';
import { ViewUploadComponent } from './view-upload/view-upload.component';

const routes: Routes = [
    {
        path: 'upload',
        component: UploadComponent,
        canActivate: [RouteGuardService],
    },
    {
        path: 'view',
        component: ViewUploadComponent,
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
