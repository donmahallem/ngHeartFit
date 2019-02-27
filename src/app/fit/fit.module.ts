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
    MatTableModule
} from '@angular/material';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgGapiConfigModule } from '../nggapi-config.module';
import { DatasourcesComponent } from './datasources/datasources.component';
import { FitRoutingModule } from './fit-routing.module';
import { DatasourceDetailComponent } from './datasources/datasource-detail.component';
import { DatasourceComponent } from './datasources/datasource.component';
import { SessionsComponent } from './sessions/sessions.component';
import { SessionComponent } from './sessions/session.component';
import { SessionDetailComponent } from './session-detail/session-detail.component';

@NgModule({
    declarations: [
        DatasourcesComponent,
        DatasourceDetailComponent,
        DatasourceComponent,
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
        MatTableModule
    ],
    providers: [
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS }
    ]
})
export class FitModule { }
