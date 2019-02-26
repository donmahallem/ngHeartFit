import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatButtonModule, MatCheckboxModule, MatGridListModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatDatepickerModule, MatIconModule } from '@angular/material';
import { Observable, from, of, throwError } from 'rxjs';
import { Injectable, Component, Input } from '@angular/core';
import { ViewUploadComponent } from './view-upload.component';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

import * as sinon from 'sinon';
import { AnalyzeDataService } from '../services/analyze-data.service';
import { DataPoint } from './data-point';

@Injectable()
class testAnalyzeDataService {
    submitBodyMetrics() {

    }
}


@Component({
    selector: 'weight-chart',
    template: '',
    styleUrls: []
})
class testWeightChartComponent {
    @Input('chartData')
    public chartData: DataPoint[];
}

@Component({
    selector: 'upload-to-fit-cmp',
    template: '',
    styleUrls: []
})
export class testUploadToFitComponent {
    public _dataPoints: DataPoint[] = [];
    @Input('dataPoints')
    public set dataPoints(data: DataPoint[]) {
        this._dataPoints = data;
    }

    public get dataPoints(): DataPoint[] {
        return this._dataPoints;
    }
}
let sandbox;
describe('BodyMetricsComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                MatButtonModule
            ],
            declarations: [
                ViewUploadComponent,
                testWeightChartComponent,
                testUploadToFitComponent
            ],
            providers: [
                { provide: AnalyzeDataService, useValue: new testAnalyzeDataService() }
            ]
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
