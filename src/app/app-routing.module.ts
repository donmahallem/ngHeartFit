import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UploadComponent } from './analyze/upload/upload.component';

const routes: Routes = [
    {
        path: "analyze/upload",
        component: UploadComponent
    },
    {
        path: 'profile',
        data: {
            requiresLogin: false
        },
        loadChildren: "./profile/profile.module#ProfileModule"
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
