import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './components';
import { RouteGuardService } from '../service/route-guard.service';

const routes: Routes = [
    {
        path: "",
        component: ProfileComponent,
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
export class ProfileRoutingModule { }
