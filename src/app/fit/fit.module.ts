import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatGridListModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatProgressBarModule
} from '@angular/material';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgGapiConfigModule } from '../nggapi-config.module';
import { FitRoutingModule } from './fit-routing.module';
import { SessionsComponent } from './sessions/sessions.component';
import { SessionComponent } from './sessions/session.component';
import { SessionDetailComponent } from './session-detail/session-detail.component';
import { DatasourcesModule } from './datasources/datasources.module';
import { DatasourceDetailModule } from './datasource-detail';
import { NotFoundComponent } from '../not-found.component';

@NgModule({
    declarations: [
        SessionsComponent,
        SessionComponent,
        SessionDetailComponent
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
        DatasourceDetailModule
    ],
    providers: [
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS }
    ]
})
export class FitModule { }
