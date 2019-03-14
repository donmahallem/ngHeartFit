import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileComponent } from './components/profile.component';
import { environment } from 'src/environments/environment';
import { MatButtonModule, MatSidenavModule, MatToolbarModule, MatTabsModule, MatProgressBarModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { LoginGoogleComponent } from './components/login-google/login-google.component';
import { NgGapiConfigModule } from './nggapi-config.module';
import { RouteGuardService } from './service/route-guard.service';
import { NotFoundComponent } from './not-found.component';
import { RouteLoadingIndicatorComponent } from './route-loading-indicator.component';

@NgModule({
    declarations: [
        AppComponent,
        ProfileComponent,
        LoginGoogleComponent,
        RouteLoadingIndicatorComponent
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
        FlexLayoutModule
    ],
    providers: [
        RouteGuardService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
