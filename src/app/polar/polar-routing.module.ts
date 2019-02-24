import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UploadComponent } from './upload/upload.component';
import { RouteGuardService } from '../service/route-guard.service';
import { ViewUploadComponent } from './view-upload/view-upload.component';
import { UploadResolver } from './services/upload.resolver';

const routes: Routes = [
    {
        path: 'upload',
        component: UploadComponent,
        canActivate: [RouteGuardService]
    },
    {
        path: 'view',
        component: ViewUploadComponent,
    },
    {
        path: '**',
        redirectTo: 'upload'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [
        RouteGuardService,
        UploadResolver
    ]
})
export class PolarRoutingModule { }
