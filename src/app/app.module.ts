import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileComponent } from './components/profile.component';
import { WeightChartComponent } from './components/weight-chart.component';
import { UploadComponent } from './analyze/upload/upload.component';

@NgModule({
    declarations: [
        AppComponent,
        ProfileComponent,
        WeightChartComponent,
        UploadComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
