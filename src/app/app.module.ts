/*!
 * Source https://github.com/donmahallem/ngHeartFit
 */

import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginGoogleComponent } from './components/login-google/login-google.component';
import { ProfileComponent } from './components/profile.component';
import { NgGapiConfigModule } from './nggapi-config.module';
import { RouteLoadingIndicatorComponent } from './route-loading-indicator.component';
import { RouteGuardService } from './service/route-guard.service';

@NgModule({
    bootstrap: [AppComponent],
    declarations: [
        AppComponent,
        ProfileComponent,
        LoginGoogleComponent,
        RouteLoadingIndicatorComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatProgressBarModule,
        MatSidenavModule,
        MatToolbarModule,
        MatTabsModule,
        HttpClientModule,
        NgGapiConfigModule.forRoot(),
        FlexLayoutModule,
    ],
    providers: [
        RouteGuardService,
    ],
})
export class AppModule { }
