import { Component, Injectable, Input } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { ViewUploadComponent } from './view-upload.component';

import * as sinon from 'sinon';
import { AnalyzeDataService } from '../services/analyze-data.service';
import { DataPoint } from './data-point';

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
    public chartData: DataPoint[];
}

@Component({
    selector: 'upload-to-fit-cmp',
    template: '',
    styleUrls: [],
})
export class TestUploadToFitComponent {
    public _dataPoints: DataPoint[] = [];
    @Input('dataPoints')
    public set dataPoints(data: DataPoint[]) {
        this._dataPoints = data;
    }

    public get dataPoints(): DataPoint[] {
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
