import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UploadComponent } from './upload/upload.component';
import { RouteGuardService } from '../service/route-guard.service';
import { ViewUploadComponent } from './view-upload/view-upload.component';

const routes: Routes = [
    {
        path: "upload",
        component: UploadComponent,
        canActivate: [RouteGuardService]
    },
    {
        path: "upload/:id",
        component: ViewUploadComponent,
        canActivate: [RouteGuardService]
    },
    {
        path: "**",
        redirectTo: "upload"
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [
        RouteGuardService
    ]
})
export class AnalyzeRoutingModule { }
