import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UploadComponent } from './upload/upload.component';
import { RouteGuardService } from '../service/route-guard.service';

const routes: Routes = [
    {
        path: "**",
        component: UploadComponent,
        canActivate: [RouteGuardService]
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
