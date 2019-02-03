import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatButtonModule, MatCheckboxModule, MatGridListModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatDatepickerModule, MatIconModule } from '@angular/material';
import { Observable, from, of, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { BodyMetricsFormComponent } from './bodymetrics-form.component';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

import * as sinon from "sinon";
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { GapiService, SubmitBodyMetricsRequest } from 'src/app/service/gapi.service';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import * as moment from 'moment';

@Injectable()
class testGapiService {
    submitBodyMetrics(data: SubmitBodyMetricsRequest): Observable<any> {
        return null;
    }
}
let sandbox;
describe('BodyMetricsComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                MatButtonModule,
                MatCheckboxModule,
                MatGridListModule,
                ReactiveFormsModule,
                MatFormFieldModule,
                MatInputModule,
                MatSelectModule,
                MatIconModule,
                MatDatepickerModule,
                NoopAnimationsModule
            ],
            declarations: [
                BodyMetricsFormComponent
            ],
            providers: [
                { provide: GapiService, useValue: new testGapiService() },
                { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
                { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        //testUploadDataService.
    });

    it('should create the component', () => {
        const fixture = TestBed.createComponent(BodyMetricsFormComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    });
    beforeAll(() => { sandbox = sinon.sandbox.create(); })
    afterEach(() => { sandbox.restore(); })
    describe('onSubmit()', () => {
        let fixture: ComponentFixture<BodyMetricsFormComponent>;
        let component: BodyMetricsFormComponent;
        let validStub: sinon.SinonStub;
        let submitBodyMetricsStub: sinon.SinonStub;
        let service: GapiService;
        beforeEach(() => {
            fixture = TestBed.createComponent(BodyMetricsFormComponent);
            component = fixture.debugElement.componentInstance;
            service = fixture.debugElement.injector.get(GapiService);
            validStub = sinon.stub(component.metricsForm, 'valid');
            submitBodyMetricsStub = sandbox.stub(service, 'submitBodyMetrics');
            submitBodyMetricsStub.returns(of(true));
        });
        describe('form is not valid', () => {
            beforeEach(() => {
                validStub.value(false);
            })
            it('should not call submitBodyMetrics', () => {
                component.onSubmit();
                expect(submitBodyMetricsStub.callCount).toEqual(0);
            });
        });
        describe('form is valid', () => {
            let inputBodyHeight, inputDate, inputTime: HTMLInputElement;
            let inputBodyHeightUnit: HTMLSelectElement;
            const testTimestamp: number = 1549193178;
            beforeEach(() => {
                validStub.value(true);
                inputBodyHeight = fixture.nativeElement.querySelector('.inputbodyheight');
                inputBodyHeightUnit = fixture.nativeElement.querySelector('.inputbodyheightunit');
                inputDate = fixture.nativeElement.querySelector('.inputdate');
                inputTime = fixture.nativeElement.querySelector('.inputtime');
                component.metricsForm.get('date').setValue(moment.unix(testTimestamp).local());
                component.metricsForm.get('time').setValue(moment.unix(testTimestamp).local().format("HH:mm"));
            });
            it('should call submitBodyMetrics', () => {
                inputBodyHeight.value = "23";
                inputBodyHeightUnit.value = "feet";
                component.metricsForm.get('bodyweight').setValue(23);
                fixture.detectChanges();
                component.onSubmit();
                expect(submitBodyMetricsStub.callCount).toEqual(1);
                console.log(submitBodyMetricsStub.getCall(0).args);
                expect(submitBodyMetricsStub.getCall(0).args[0]).toEqual({
                    bodyweight: 23,
                    timestamp: testTimestamp,
                    bodyfat: 0,
                    bodyheight: 0
                });
            });
        });
    });
});
