import { TestBed, async, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatIconModule
} from '@angular/material';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { BodyMetricsFormComponent, BodyMetricsFormData } from './bodymetrics-form.component';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

import * as sinon from 'sinon';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import * as moment from 'moment';
import { SubmitBodyMetricsRequest } from 'src/app/service/fit-api.service';
import { FitApiDataSourceService } from 'src/app/service/fit-data-source.service';

export function NewEvent(eventName: string, bubbles = false, cancelable = false) {
    const evt = document.createEvent('CustomEvent');  // MUST be 'CustomEvent'
    evt.initCustomEvent(eventName, bubbles, cancelable, null);
    return evt;
}

@Injectable()
class TestGapiService {
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
                { provide: FitApiDataSourceService, useValue: new TestGapiService() },
                { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
                { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        // testUploadDataService.
    });

    it('should create the component', () => {
        const fixture = TestBed.createComponent(BodyMetricsFormComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    });
    beforeAll(() => { sandbox = sinon.createSandbox(); });
    afterEach(() => { sandbox.restore(); });
    describe('onSubmit()', () => {
        let fixture: ComponentFixture<BodyMetricsFormComponent>;
        let component: BodyMetricsFormComponent;
        let validStub: sinon.SinonStub;
        let submitBodyMetricsStub: sinon.SinonStub;
        let service: FitApiDataSourceService;
        beforeEach(() => {
            fixture = TestBed.createComponent(BodyMetricsFormComponent);
            component = fixture.debugElement.componentInstance;
            service = fixture.debugElement.injector.get(FitApiDataSourceService);
            validStub = sinon.stub(component.metricsForm, 'valid');
            submitBodyMetricsStub = sandbox.stub(component, 'submitData');
            submitBodyMetricsStub.returns(of(true));
        });
        describe('form is not valid', () => {
            beforeEach(() => {
                validStub.value(false);
            });
            it('should not call submitBodyMetrics', () => {
                component.onSubmit();
                expect(submitBodyMetricsStub.callCount).toEqual(0);
            });
        });
        describe('form is valid', () => {
            let inputBodyWeight,
                inputBodyFat,
                inputBodyHeight,
                inputTimestamp: HTMLInputElement;
            let inputBodyHeightUnit,
                inputBodyWeightUnit: HTMLSelectElement;
            const testTimestamp = 1549193178;
            beforeEach(() => {
                validStub.value(true);
                inputBodyHeight = fixture.nativeElement.querySelector('.inputbodyheight');
                inputBodyFat = fixture.nativeElement.querySelector('.inputbodyfat');
                inputBodyWeight = fixture.nativeElement.querySelector('.inputbodyweight');
                inputBodyHeightUnit = fixture.nativeElement.querySelector('.inputbodyheightunit');
                inputBodyWeightUnit = fixture.nativeElement.querySelector('.inputbodyweightunit');
                inputTimestamp = fixture.nativeElement.querySelector('.inputtimestamp');
            });
            it('should connect inputs to form', () => {
                const testData: BodyMetricsFormData = {
                    bodyfat: 29.2,
                    bodyheight: 92,
                    bodyweight: 78,
                    bodyheightunit: 'inch',
                    bodyweightunit: 'kilogram',
                    timestamp: moment.unix(testTimestamp).local()
                };
                component.metricsForm.patchValue(testData);
                fixture.detectChanges();
                expect(inputBodyHeight.value).toEqual('92');
                expect(inputBodyWeight.value).toEqual('78');
                expect(inputBodyFat.value).toEqual('29.2');
                // expect(inputBodyHeightUnit.options[inputBodyHeightUnit.selectedIndex].value).toEqual('inch');
                // expect(inputBodyWeightUnit.options[inputBodyWeightUnit.selectedIndex].value).toEqual('kg');
            });

            it('should call submitBodyMetrics with inch and pound', () => {
                const testData: BodyMetricsFormData = {
                    bodyfat: 29.2,
                    bodyheight: 92,
                    bodyweight: 78,
                    bodyheightunit: 'inch',
                    bodyweightunit: 'pound',
                    timestamp: moment.unix(testTimestamp).local(),
                };
                component.metricsForm.setValue(testData);
                fixture.detectChanges();
                component.metricsForm.updateValueAndValidity();
                component.onSubmit();
                expect(submitBodyMetricsStub.callCount).toEqual(1);
                expect(submitBodyMetricsStub.getCall(0).args[0]).toEqual({
                    bodyweight: testData.bodyweight * BodyMetricsFormComponent.POUND_TO_KILOGRAM,
                    timestamp: testTimestamp,
                    bodyfat: testData.bodyfat,
                    bodyheight: testData.bodyheight * BodyMetricsFormComponent.INCH_TO_METER
                });
            });
            it('should call submitBodyMetrics with foot and stone', () => {
                const testData: BodyMetricsFormData = {
                    bodyfat: 29.2,
                    bodyheight: 92,
                    bodyweight: 78,
                    bodyheightunit: 'foot',
                    bodyweightunit: 'stone',
                    timestamp: moment.unix(testTimestamp).local()
                };
                component.metricsForm.patchValue(testData);
                fixture.detectChanges();
                component.metricsForm.updateValueAndValidity();
                component.onSubmit();
                expect(submitBodyMetricsStub.callCount).toEqual(1);
                expect(submitBodyMetricsStub.getCall(0).args[0]).toEqual({
                    bodyweight: testData.bodyweight * BodyMetricsFormComponent.STONE_TO_KILOGRAM,
                    timestamp: testTimestamp,
                    bodyfat: testData.bodyfat,
                    bodyheight: testData.bodyheight * BodyMetricsFormComponent.FOOT_TO_METER
                });
            });
            it('should call submitBodyMetrics with kilogram and meter', () => {
                const testData: BodyMetricsFormData = {
                    bodyfat: 29.2,
                    bodyheight: 92,
                    bodyweight: 78,
                    bodyheightunit: 'meter',
                    bodyweightunit: 'kilogram',
                    timestamp: moment.unix(testTimestamp).local()
                };
                component.metricsForm.patchValue(testData);
                fixture.detectChanges();
                component.metricsForm.updateValueAndValidity();
                component.onSubmit();
                expect(submitBodyMetricsStub.callCount).toEqual(1);
                expect(submitBodyMetricsStub.getCall(0).args[0]).toEqual({
                    bodyweight: testData.bodyweight,
                    timestamp: testTimestamp,
                    bodyfat: testData.bodyfat,
                    bodyheight: testData.bodyheight
                });
            });
        });
    });
});
