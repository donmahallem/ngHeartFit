import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UploadComponent } from './analyze/upload/upload.component';

const routes: Routes = [
    {
        path: "analyze",
        data: {
            requiresLogin: true
        },
        loadChildren: "./analyze/analyze.module#AnalyzeModule"
    },
    {
        path: 'profile',
        data: {
            requiresLogin: true
        },
        loadChildren: "./profile/profile.module#ProfileModule"
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
