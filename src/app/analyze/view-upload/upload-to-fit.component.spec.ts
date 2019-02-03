import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatButtonModule, MatCheckboxModule, MatGridListModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatDatepickerModule, MatIconModule } from '@angular/material';
import { Observable, from, of, throwError } from 'rxjs';
import { Injectable, Component, Input } from '@angular/core';
import { UploadToFitComponent } from './upload-to-fit.component';

import * as sinon from "sinon";
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { GapiService } from 'src/app/service/gapi.service';
import { ReactiveFormsModule } from '@angular/forms';
import { AnalyzeDataService } from '../services/analyze-data.service';
import { DataPoint } from './data-point';
import { WeightChartComponent } from './weight-chart.component';
import { FitApiService } from 'src/app/service/fit-api.service';

@Injectable()
class testAnalyzeDataService {
    submitBodyMetrics() {

    }
}

class testFitApiService {

}

let sandbox;
describe('UploadToFitComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                MatButtonModule
            ],
            declarations: [
                UploadToFitComponent
            ],
            providers: [
                { provide: FitApiService, useValue: new testFitApiService() }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        //testUploadDataService.
    });

    it('should create the app', () => {
        const fixture = TestBed.createComponent(UploadToFitComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    });
    beforeAll(() => { sandbox = sinon.sandbox.create(); });
    afterEach(() => { sandbox.restore(); });
});
