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
    selector: 'app-weight-chart',
    styleUrls: [],
    template: '',
})
class TestWeightChartComponent {
    @Input()
    public chartData: IDataPoint[];
}

@Component({
    selector: 'app-upload-to-fit',
    styleUrls: [],
    template: '',
})
export class TestUploadToFitComponent {
    public mDataPoints: IDataPoint[] = [];
    @Input('dataPoints')
    public set dataPoints(data: IDataPoint[]) {
        this.mDataPoints = data;
    }

    public get dataPoints(): IDataPoint[] {
        return this.mDataPoints;
    }
}
describe('BodyMetricsComponent', () => {

    let sandbox: sinon.SinonSandbox;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ViewUploadComponent,
                TestWeightChartComponent,
                TestUploadToFitComponent,
            ],
            imports: [
                RouterTestingModule,
                MatButtonModule,
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
    beforeAll(() => { sandbox = sinon.createSandbox(); });
    afterEach(() => { sandbox.restore(); });
});
