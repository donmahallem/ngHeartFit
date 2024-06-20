/*!
 * Source https://github.com/donmahallem/ngHeartFit
 */

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MomentDateAdapter, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { NgGapiConfigModule } from '../nggapi-config.module';
import { DatasourceDetailModule } from './datasource-detail';
import { DatasourcesModule } from './datasources/datasources.module';
import { FitDashboardModule } from './fit-dashboard';
import { FitRoutingModule } from './fit-routing.module';
import { SessionDetailComponent } from './session-detail/session-detail.component';
import { SessionComponent } from './sessions/session.component';
import { SessionResolver } from './sessions/session.resolver';
import { SessionsComponent } from './sessions/sessions.component';
import { SessionsResolver } from './sessions/sessions.resolver';

@NgModule({
    declarations: [
        SessionsComponent,
        SessionComponent,
        SessionDetailComponent,
    ],
    imports: [
        CommonModule,
        FitRoutingModule,
        MatButtonModule,
        HttpClientModule,
        MatGridListModule,
        MatIconModule,
        MatCheckboxModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        NgGapiConfigModule,
        MatTableModule,
        MatProgressBarModule,
        DatasourcesModule,
        DatasourceDetailModule,
        FitDashboardModule,
    ],
    providers: [
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
        SessionsResolver,
        SessionResolver,
    ],
})
export class FitModule { }
