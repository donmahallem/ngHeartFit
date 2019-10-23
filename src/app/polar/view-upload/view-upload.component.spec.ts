/*!
 * Source https://github.com/donmahallem/ngHeartFit
 */

import { Component, Injectable, Input } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { ViewUploadComponent } from './view-upload.component';

import * as sinon from 'sinon';
import { AnalyzeDataService } from '../services/analyze-data.service';
import { IDataPoint } from './data-point';

@Injectable()
class TestAnalyzeDataService {
    submitBodyMetrics() {

    }
}

@Component({
    selector: 'weight-chart',
    template: '',
    styleUrls: [],
})
class TestWeightChartComponent {
    @Input('chartData')
    public chartData: IDataPoint[];
}

@Component({
    selector: 'upload-to-fit-cmp',
    template: '',
    styleUrls: [],
})
export class TestUploadToFitComponent {
    public _dataPoints: IDataPoint[] = [];
    @Input('dataPoints')
    public set dataPoints(data: IDataPoint[]) {
        this._dataPoints = data;
    }

    public get dataPoints(): IDataPoint[] {
        return this._dataPoints;
    }
}
let sandbox: sinon.SinonSandbox;
describe('BodyMetricsComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                MatButtonModule,
            ],
            declarations: [
                ViewUploadComponent,
                TestWeightChartComponent,
                TestUploadToFitComponent,
            ],
            providers: [
                { provide: AnalyzeDataService, useValue: new TestAnalyzeDataService() },
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        // testUploadDataService.
    });

    it('should create the app', () => {
        const fixture = TestBed.createComponent(ViewUploadComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    });
    beforeAll(() => { sandbox = sinon.sandbox.create(); });
    afterEach(() => { sandbox.restore(); });
});
