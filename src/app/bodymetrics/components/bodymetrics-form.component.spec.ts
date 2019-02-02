import { TestBed, async } from '@angular/core/testing';
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
import { GapiService } from 'src/app/service/gapi.service';
import { ReactiveFormsModule } from '@angular/forms';

@Injectable()
class testGapiService {
    submitBodyMetrics() {

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
                MatDatepickerModule
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

    it('should create the app', () => {
        const fixture = TestBed.createComponent(BodyMetricsFormComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    });
    beforeAll(() => { sandbox = sinon.sandbox.create(); })
    afterEach(() => { sandbox.restore(); })
    describe('uploadFiles()', () => {
        it('should test', () => {
            const fixture = TestBed.createComponent(BodyMetricsFormComponent);
            const app: BodyMetricsFormComponent = fixture.debugElement.componentInstance;
            expect(app).toBeTruthy();
            let service = fixture.debugElement.injector.get(GapiService);
            const stub: sinon.SinonStub = sandbox.stub(service, 'submitBodyMetrics');
            const testData: any[] = [{
                'test': 'data1',
                'test2': 1234
            }, {
                'test': 'data6',
                'test2': 1234436
            }];
            stub.get(() => { return testData });
            stub.restore();
        });
    });
});
