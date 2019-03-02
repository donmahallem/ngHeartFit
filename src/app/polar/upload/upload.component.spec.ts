import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatButtonModule, MatCheckboxModule, MatGridListModule } from '@angular/material';
import { Observable, from, Subscriber } from 'rxjs';
import { Injectable, Component, Input } from '@angular/core';
import * as testObject from './upload.component';
import { FilePreviewComponent } from './file-preview.component';
import { UploadDataService, UploadFile, UploadFileType, TypedFiles } from '../services';

import * as sinon from 'sinon';
import { AnalyzeDataService } from '../services/analyze-data.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { FlowApiValidator } from '@donmahallem/flow-api-types';
import { ValidatorResult, ValidationError } from 'jsonschema';
import { FileUtil, FileLoadEvents, FileLoadEventType } from 'src/app/util';

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
    selector: 'app-file-preview',
    template: '<p></p>'
})
export class TestFilePreviewComponent {

    @Input('uploadFile')
    public file: UploadFile;
}
let sandbox: sinon.SinonSandbox;
describe('app/polar/upload/upload.component', () => {
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

        describe('createConvertUploadFileAndCheckValidity()', () => {
            let validatorStub: sinon.SinonStub;
            const testEvents: FileLoadEvents<any>[] = [{
                key: 'testkey',
                type: FileLoadEventType.START
            }, {
                key: 'testkey',
                type: FileLoadEventType.PROGRESS,
                lengthComputable: true,
                loaded: 129,
                total: 9219
            }, {
                result: 'jasdf;dsf',
                key: 'testkey',
                type: FileLoadEventType.RESULT
            }];
            beforeEach(() => {
                validatorStub = sandbox.stub(FlowApiValidator, 'validateTimelineSummary');
            });
            it('should test successful for conforming json', (done) => {
                const nextSpy: sinon.SinonSpy = sinon.spy();
                const validatorRes: ValidatorResult = <any>{
                    valid: true
                };
                validatorStub.returns(validatorRes);
                from(testEvents)
                    .pipe(cmpInstance.createConvertUploadFileAndCheckValidity())
                    .subscribe(nextSpy, done, () => {
                        expect(nextSpy.callCount).toEqual(3);
                        expect(nextSpy.getCall(0).args).toEqual([testEvents[0]]);
                        expect(nextSpy.getCall(1).args).toEqual([testEvents[1]]);
                        expect(validatorStub.callCount).toEqual(1, 'Should be called once');
                        const parsedFile: FileLoadEvents<TypedFiles> = nextSpy.getCall(2).args[0];
                        expect(parsedFile).toEqual({
                            type: FileLoadEventType.RESULT,
                            key: testEvents[2].key,
                            result: {
                                type: UploadFileType.DAY_SUMMARY,
                                data: (<any>testEvents[2]).result
                            }
                        });
                        done();
                    });
            });
            it('should test that there is non conforming json', (done) => {
                const validatorErrors: ValidationError[] = [
                    <any>{
                        test: 1
                    }, <any>{
                        test: 2
                    }
                ];
                const validatorRes: ValidatorResult = <any>{
                    valid: false,
                    errors: validatorErrors
                };
                validatorStub.returns(validatorRes);
                const nextSpy: sinon.SinonSpy = sinon.spy();
                from(testEvents)
                    .pipe(cmpInstance.createConvertUploadFileAndCheckValidity())
                    .subscribe(nextSpy, (err) => {
                        expect(nextSpy.callCount).toEqual(2);
                        expect(nextSpy.getCall(0).args).toEqual([testEvents[0]]);
                        expect(nextSpy.getCall(1).args).toEqual([testEvents[1]]);
                        expect(validatorStub.callCount).toEqual(1, 'Should be called once');
                        expect(err).toEqual(validatorErrors[0]);
                        done();
                    }, done);
            });
        });

        describe('uploadFiles', () => {
            describe('getter', () => {
                let upDataService: UploadDataService;
                let uploadedFilesStub: sinon.SinonStub;
                let readFileStub: sinon.SinonStub;
                const testValues: any[] = [
                    { test: 1 },
                    { test: 2 },
                    { test: 5 },
                    { test: 3 }
                ];
                beforeEach(() => {
                    upDataService = fixture.debugElement.injector.get(UploadDataService);
                    uploadedFilesStub = sandbox.stub(upDataService, 'uploadedFiles');
                });
                testValues.forEach((value: any) => {
                    it('should return the expected value from the service', () => {
                        uploadedFilesStub.get(() => {
                            return value;
                        });
                        expect(cmpInstance.uploadFiles).toEqual(value);
                    });
                });
            });
        });

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
                readFileStub = sandbox.stub(FileUtil, 'readFileAsJson');
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
                const observable: Observable<FileLoadEvents<any>> = cmpInstance.validateFiles(testData);
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
