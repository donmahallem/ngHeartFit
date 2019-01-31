import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UploadComponent } from './analyze/upload/upload.component';
import { LoginGoogleComponent } from './components/login-google/login-google.component';
import { GoogleAuthCallbackGuard } from './components/google-auth-callback/google-auth-callback.guard';

const routes: Routes = [
    {
        path: "analyze",
        data: {
            requiresLogin: true
        },
        loadChildren: "./analyze/analyze.module#AnalyzeModule"
    }, {
        path: 'profile',
        data: {
            requiresLogin: true
        },
        loadChildren: "./profile/profile.module#ProfileModule"
    }, {
        path: 'login',
        children: [
            {
                path: "google",
                component: LoginGoogleComponent,
                resolve: {
                    signin_url: GoogleAuthCallbackGuard
                },
                children: [
                    {
                        canActivate: [GoogleAuthCallbackGuard],
                        path: "callback",
                        children: []
                    }
                ]
            },
            {
                path: "polarflow",
                children: []
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes,
        { enableTracing: false })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
