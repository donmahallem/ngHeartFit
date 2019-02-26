import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatButtonModule, MatCheckboxModule, MatGridListModule } from '@angular/material';
import { Observable, from, Subscriber } from 'rxjs';
import { Injectable, Component, Input } from '@angular/core';
import * as testObject from './upload.component';
import { FilePreviewComponent } from './file-preview.component';
import { UploadDataService, UploadFile } from '../services';

import * as sinon from 'sinon';
import { AnalyzeDataService } from '../services/analyze-data.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable()
class TestUploadDataService {

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
class TestAnalyzeDataService {
    clear(): Observable<void> {
        return null;
    }

}
@Injectable()
class TestRouter {
    public navigate(): void {

    }
}
@Component({
    selector: 'file-preview-cmp',
    template: "<p></p>"
})
export class TestFilePreviewComponent {

    @Input('uploadFile')
    public file: UploadFile;
}
let sandbox: sinon.SinonSandbox;
describe('app/polar/upload/upload.component', () => {
    describe('createConvertUploadFileAndCheckValidity()', () => {
        it('should test for the case JSON.parse fails');
        it('should test that there is non conforming json');
        it('should test for conforming json');
    });
    describe('UploadComponent', () => {
        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [
                    RouterTestingModule,
                    MatButtonModule
                ],
                declarations: [
                    testObject.UploadComponent,
                    TestFilePreviewComponent
                ],
                providers: [
                    { provide: UploadDataService, useValue: new TestUploadDataService() },
                    { provide: AnalyzeDataService, useValue: new TestAnalyzeDataService() },
                    { provide: Router, useValue: new TestRouter() }
                ]
            }).compileComponents();
        }));

        let fixture: ComponentFixture<testObject.UploadComponent>;
        let cmpInstance: testObject.UploadComponent;
        beforeEach(() => {
            fixture = TestBed.createComponent(testObject.UploadComponent);
            cmpInstance = fixture.debugElement.componentInstance;
        });
        it('should create the app', () => {
            expect(cmpInstance).toBeTruthy();
        });
        beforeAll(() => { sandbox = sinon.createSandbox(); });
        afterEach(() => { sandbox.restore(); });
        describe('validateFiles()', () => {
            let upDataService: UploadDataService;
            let uploadDataServiceClearStub: sinon.SinonStub;
            let readFileStub: sinon.SinonStub;
            let nextSpy: sinon.SinonSpy;
            let convertValidityStub: sinon.SinonStub;
            let convertValidityInnerStub: sinon.SinonStub;
            beforeEach(() => {
                upDataService = fixture.debugElement.injector.get(UploadDataService);
                uploadDataServiceClearStub = sandbox.stub(upDataService, 'clear');
                readFileStub = sandbox.stub(cmpInstance, 'readFile');
                readFileStub.callsFake((inp) => from([inp]));
                nextSpy = sandbox.spy();
                convertValidityStub = sandbox.stub(cmpInstance, 'createConvertUploadFileAndCheckValidity');
                convertValidityInnerStub = sandbox.stub();
                convertValidityInnerStub.callsFake((inp) => {
                    return {
                        inp: inp
                    };
                });
                convertValidityStub.callsFake(() => {
                    return map(convertValidityInnerStub);
                });
            });
            it('should test fine', (done) => {
                const testData: HTMLInputElement = <any>{
                    files: [
                        { test: 1 },
                        { test: 2 },
                        null,
                        { test: 3 }
                    ]
                };
                const observable: Observable<UploadFile> = cmpInstance.validateFiles(testData);
                expect(uploadDataServiceClearStub.callCount).toEqual(1, 'the database should be cleared before new data is added');
                observable
                    .subscribe(nextSpy, done, () => {
                        expect(nextSpy.callCount).toEqual(3, 'the observable should create three results');
                        expect(convertValidityInnerStub.callCount).toEqual(3, 'the inner map should be called three times');
                        expect(convertValidityStub.callCount).toEqual(1);
                        expect(nextSpy.getCall(0).args).toEqual([{
                            inp: testData.files[0]
                        }]);
                        expect(nextSpy.getCall(1).args).toEqual([{
                            inp: testData.files[1]
                        }]);
                        expect(nextSpy.getCall(2).args).toEqual([{
                            inp: testData.files[3]
                        }]);
                        done();
                    });
            });
        });
    });
});