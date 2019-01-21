import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatButtonModule, MatCheckboxModule, MatGridListModule } from '@angular/material';
import { Observable, from, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { UploadComponent } from './upload.component';
import { FilePreviewComponent } from './file-preview.component';
import { UploadDataService, UploadFile } from '../services';

import * as sinon from "sinon";
import { AnalyzeDataService } from '../services/analyze-data.service';
import { Router } from '@angular/router';

@Injectable()
class testUploadDataService {

    public get uploadedFiles(): UploadFile[] {
        return [];
    }
    public update(): void {
    }

    public set uploadedFiles(files: UploadFile[]) {
    }

    public get uploadedFilesObservable(): Observable<UploadFile[]> {
        return null;
    }

    public get uploadableFilesObservable(): Observable<boolean> {
        return null;
    }

    public addUploadFile(f: UploadFile): void {
    }

    public clear(): void {
    }
}
@Injectable()
class testAnalyzeDataService {
    clear(): Observable<void> {
        return null;
    }

}
@Injectable()
class testRouter {

}
let sandbox;
describe('UploadComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                MatButtonModule,
                MatCheckboxModule,
                MatGridListModule
            ],
            declarations: [
                UploadComponent,
                FilePreviewComponent
            ],
            providers: [
                { provide: UploadDataService, useValue: new testUploadDataService() },
                { provide: AnalyzeDataService, useValue: new testAnalyzeDataService() },
                { provide: Router, useValue: new testRouter() }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        //testUploadDataService.
    });

    it('should create the app', () => {
        const fixture = TestBed.createComponent(UploadComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    });
    beforeAll(() => { sandbox = sinon.sandbox.create(); })
    afterEach(() => { sandbox.restore(); })
    describe('uploadFiles()', () => {
        it('should test', () => {
            const fixture = TestBed.createComponent(UploadComponent);
            const app: UploadComponent = fixture.debugElement.componentInstance;
            expect(app).toBeTruthy();
            let service = fixture.debugElement.injector.get(UploadDataService);
            const stub: sinon.SinonStub = sandbox.stub(service, 'uploadedFiles');
            const testData: any[] = [{
                'test': 'data1',
                'test2': 1234
            }, {
                'test': 'data6',
                'test2': 1234436
            }];
            stub.get(() => { return testData });
            expect(app.uploadFiles).toEqual(testData);
            stub.restore();
        });
    });
    describe('validFiles - get', () => {
        it('should return false for no files', () => {
            const fixture = TestBed.createComponent(UploadComponent);
            const app: UploadComponent = fixture.debugElement.componentInstance;
            expect(app).toBeTruthy();
            let service = fixture.debugElement.injector.get(UploadDataService);
            const stub: sinon.SinonStub = sandbox.stub(service, 'uploadedFiles');
            const testData: any[] = []
            stub.get(() => { return testData });
            expect(app.validFiles).toBeFalsy();
            stub.restore();
        });
        it('should return false for no valid files', () => {
            const fixture = TestBed.createComponent(UploadComponent);
            const app: UploadComponent = fixture.debugElement.componentInstance;
            expect(app).toBeTruthy();
            let service = fixture.debugElement.injector.get(UploadDataService);
            const stub: sinon.SinonStub = sandbox.stub(service, 'uploadedFiles');
            const testData: any[] = [{
                'test': 'data1',
                'test2': 1234,
                valid: false
            }, {
                'test': 'data6',
                'test2': 1234436,
                valid: false
            }];
            stub.get(() => { return testData });
            expect(app.validFiles).toBeFalsy();
            stub.restore();
        });
        it('should return true for no valid files and undefined checked state', () => {
            const fixture = TestBed.createComponent(UploadComponent);
            const app: UploadComponent = fixture.debugElement.componentInstance;
            expect(app).toBeTruthy();
            let service = fixture.debugElement.injector.get(UploadDataService);
            const stub: sinon.SinonStub = sandbox.stub(service, 'uploadedFiles');
            const testData: any[] = [{
                'test': 'data1',
                'test2': 1234,
                valid: false
            }, {
                'test': 'data6',
                'test2': 1234436,
                valid: true
            }];
            stub.get(() => { return testData });
            expect(app.validFiles).toBeTruthy();
            stub.restore();
        });
        it('should return false for no valid files and false checked state', () => {
            const fixture = TestBed.createComponent(UploadComponent);
            const app: UploadComponent = fixture.debugElement.componentInstance;
            expect(app).toBeTruthy();
            let service = fixture.debugElement.injector.get(UploadDataService);
            const stub: sinon.SinonStub = sandbox.stub(service, 'uploadedFiles');
            const testData: any[] = [{
                'test': 'data1',
                'test2': 1234,
                valid: false
            }, {
                'test': 'data6',
                'test2': 1234436,
                valid: true,
                selected: false
            }];
            stub.get(() => { return testData });
            app.importFiles(null);
            stub.restore();
        });
        it('should return true for no valid files and true checked state', () => {
            const fixture = TestBed.createComponent(UploadComponent);
            const app: UploadComponent = fixture.debugElement.componentInstance;
            expect(app).toBeTruthy();
            let service = fixture.debugElement.injector.get(UploadDataService);
            const stub: sinon.SinonStub = sandbox.stub(service, 'uploadedFiles');
            const testData: any[] = [{
                'test': 'data1',
                'test2': 1234,
                valid: false
            }, {
                'test': 'data6',
                'test2': 1234436,
                valid: true,
                selected: true
            }];
            stub.get(() => { return testData });
            expect(app.validFiles).toBeTruthy();
            stub.restore();
        });
    });
    describe('importFiles - get', () => {
        let clearDbStub: sinon.SinonStub;
        let fixture;
        let component: UploadComponent;
        let analyzeDataServiceInstance: AnalyzeDataService;
        let uploadDataServiceInstance: UploadDataService;
        let stubUploadedFiles: sinon.SinonStub;
        let stubDbClear: sinon.SinonStub;
        beforeAll(() => {
            clearDbStub = sandbox.stub()
        });

        beforeEach(() => {
            fixture = TestBed.createComponent(UploadComponent);
            component = fixture.debugElement.componentInstance;
            expect(component).toBeTruthy();
            uploadDataServiceInstance = fixture.debugElement.injector.get(UploadDataService);
            analyzeDataServiceInstance = fixture.debugElement.injector.get(AnalyzeDataService);
            stubUploadedFiles = sandbox.stub(uploadDataServiceInstance, 'uploadedFiles');
            stubDbClear = sandbox.stub(analyzeDataServiceInstance, "clear");
        });

        afterEach(() => {
            sandbox.restore();
        })
        it('should return false for no files', () => {
            const stubUploadedFiles: sinon.SinonStub = sandbox.stub(analyzeDataServiceInstance, 'uploadedFiles');
            const testData: any[] = []
            stubUploadedFiles.get(() => { return testData });
            stubDbClear.returns(of({}));
            expect(component.validFiles).toBeFalsy();
        });
    });
});
