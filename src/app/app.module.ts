import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileComponent } from './components/profile.component';
import { environment } from "src/environments/environment";
import { MatButtonModule, MatSidenavModule, MatToolbarModule, MatTabsModule } from '@angular/material';
import { GapiAuthService } from './service/gapi-auth.service';
import { GapiService } from './service/gapi.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LoginGoogleComponent } from './components/login-google/login-google.component';

@NgModule({
    declarations: [
        AppComponent,
        ProfileComponent,
        LoginGoogleComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatSidenavModule,
        MatToolbarModule,
        MatTabsModule,
        HttpClientModule
    ],
    providers: [,
        GapiAuthService,
        GapiService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
