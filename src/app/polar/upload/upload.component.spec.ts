/*!
 * Source https://github.com/donmahallem/ngHeartFit
 */

import { Component, Injectable, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { from, Observable } from 'rxjs';
import { IUploadFile, TypedFiles, UploadDataService, UploadFileType } from '../services';
import * as testObject from './upload.component';

import { Router } from '@angular/router';
import { FlowApiValidator } from '@donmahallem/flow-api-types';
import { ValidationError, ValidatorResult } from 'jsonschema';
import { map } from 'rxjs/operators';
import * as sinon from 'sinon';
import { FileLoadEvents, FileLoadEventType, FileUtil, IFileLoadResultEvent } from 'src/app/util';
import { AnalyzeDataService } from '../services/analyze-data.service';

@Injectable()
class TestUploadDataService {
    public update(): void {
    }

    public get uploadedFiles(): IUploadFile[] {
        return [];
    }

    public set uploadedFiles(files: IUploadFile[]) {
    }

    public get uploadedFilesObservable(): Observable<IUploadFile[]> {
        return undefined;
    }

    public get uploadableFilesObservable(): Observable<boolean> {
        return undefined;
    }

    public addUploadFile(f: IUploadFile): void {
    }

    public clear(): void {
    }
}
@Injectable()
class TestAnalyzeDataService {
    clear(): Observable<void> {
        return undefined;
    }

}
@Injectable()
class TestRouter {
    public navigate(): void {

    }
}
@Component({
    selector: 'app-file-preview',
    template: '<p></p>',
})
export class TestFilePreviewComponent {

    @Input('uploadFile')
    public file: IUploadFile;
}
let sandbox: sinon.SinonSandbox;
describe('app/polar/upload/upload.component', () => {
    describe('UploadComponent', () => {
        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [
                    testObject.UploadComponent,
                    TestFilePreviewComponent,
                ],
                imports: [
                    RouterTestingModule,
                    MatButtonModule,
                ],
                providers: [
                    { provide: UploadDataService, useValue: new TestUploadDataService() },
                    { provide: AnalyzeDataService, useValue: new TestAnalyzeDataService() },
                    { provide: Router, useValue: new TestRouter() },
                ],
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
            const testEvents: FileLoadEvents<string>[] = [{
                key: 'testkey',
                type: FileLoadEventType.START,
            }, {
                key: 'testkey',
                lengthComputable: true,
                loaded: 129,
                total: 9219,
                type: FileLoadEventType.PROGRESS,
            }, {
                filesize: 2392,
                key: 'testkey',
                result: 'jasdf;dsf',
                type: FileLoadEventType.RESULT,
            }];
            beforeEach(() => {
                validatorStub = sandbox.stub(FlowApiValidator, 'validateTimelineSummary');
            });
            it('should test successful for conforming json', (done) => {
                const nextSpy: sinon.SinonSpy = sinon.spy();
                const validatorRes: ValidatorResult = {
                    valid: true,
                } as any;
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
                            filesize: (testEvents[2] as IFileLoadResultEvent<string>).filesize,
                            key: testEvents[2].key,
                            result: {
                                data: (testEvents[2] as any).result,
                                type: UploadFileType.DAY_SUMMARY,
                            },
                            type: FileLoadEventType.RESULT,
                        });
                        done();
                    });
            });
            it('should test that there is non conforming json', (done) => {
                const validatorErrors: ValidationError[] = [
                    {
                        test: 1,
                    } as any, {
                        test: 2,
                    } as any,
                ];
                const validatorRes: ValidatorResult = {
                    errors: validatorErrors,
                    valid: false,
                } as any;
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
                const testValues: any[] = [
                    { test: 1 },
                    { test: 2 },
                    { test: 5 },
                    { test: 3 },
                ];
                beforeEach(() => {
                    upDataService = fixture.debugElement.injector.get(UploadDataService);
                    uploadedFilesStub = sandbox.stub(upDataService, 'uploadedFiles');
                });
                testValues.forEach((value: any) => {
                    it('should return the expected value from the service', () => {
                        uploadedFilesStub.get(() =>
                            value);
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
                convertValidityInnerStub.callsFake((inp) =>
                    ({
                        inp,
                    }));
                convertValidityStub.callsFake(() =>
                    map(convertValidityInnerStub));
            });
            it('should test fine');
        });
    });
});
