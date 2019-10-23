/*!
 * Source https://github.com/donmahallem/ngHeartFit
 */

import {
    Component,
    Injectable,
    Input,
} from '@angular/core';
import {
    async,
    ComponentFixture,
    TestBed,
} from '@angular/core/testing';
import {
    UploadDataService,
    UploadFile,
    UploadFileError,
    UploadFileStatus,
} from '../services';

import { By } from '@angular/platform-browser';
import { ValidationError } from 'jsonschema';
import * as sinon from 'sinon';
import { FileUploadErrorComponent } from './file-upload-error.component';
@Injectable()
class TestUploadDataService {
    public update(): void {

    }
}

@Component({
    selector: 'app-test-parent',
    template: '<app-file-upload-error [uploadFile]="testFile"></app-file-upload-error>',
})
class TestParentComponent {
    public testFile: UploadFile;
}
@Component({
    // tslint:disable-next-line
    selector: 'mat-progress-bar',
    template: '<div></div>',
})
class TestMatProgressBarComponent {
    @Input()
    public mode: 'determinate' | 'indeterminate' | 'buffer' | 'query';
    @Input()
    public value: number;
}

describe('app/polar/upload/file-upload-error.component', () => {
    let sandbox: sinon.SinonSandbox;
    describe('FileUploadErrorComponent', () => {
        let fixture: ComponentFixture<FileUploadErrorComponent>;
        let cmpInstance: FileUploadErrorComponent;
        const testFiles: UploadFileError[] = [{
            key: 'testFile07.json',
            filename: 'testFile07.json',
            error: new ValidationError('a random test error'),
            status: UploadFileStatus.ERROR,
        }, {
            key: 'testFile08.json',
            filename: 'testFile08.json',
            error: new Error('a random test error'),
            status: UploadFileStatus.ERROR,
        },
        ];
        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [
                ],
                declarations: [
                    FileUploadErrorComponent,
                    TestParentComponent,
                    TestMatProgressBarComponent,
                ],
                providers: [
                    { provide: UploadDataService, useValue: new TestUploadDataService() },
                ],
            }).compileComponents();
        }));
        beforeAll(() => { sandbox = sinon.createSandbox(); });
        afterEach(() => { sandbox.restore(); });
        describe('methods and properties', () => {
            beforeEach(() => {
                fixture = TestBed.createComponent(FileUploadErrorComponent);
                cmpInstance = fixture.debugElement.componentInstance;
            });
            it('should create the app', () => {
                expect(cmpInstance).toBeTruthy();
            });
            describe('isValidationError', () => {
                describe('getter', () => {
                    describe('mUploadFile is set', () => {
                        testFiles.forEach((testFile) => {
                            const testValue: boolean = testFile.error instanceof ValidationError;
                            it('should return ' + testValue, () => {
                                (cmpInstance as any).mUploadFile = testFile;
                                expect(cmpInstance.isValidationError).toEqual(testValue);
                            });
                        });
                    });
                    describe('mUploadFile is not set', () => {
                        it('should return buffer', () => {
                            (cmpInstance as any).mUploadFile = null;
                            expect(cmpInstance.isValidationError).toBeFalsy();
                        });
                    });
                });
            });
        });
        describe('layout', () => {
            describe('child components', () => {
                beforeEach(() => {
                    fixture = TestBed.createComponent(FileUploadErrorComponent);
                    cmpInstance = fixture.debugElement.componentInstance;
                });
                it('should create the app', () => {
                    expect(cmpInstance).toBeTruthy();
                });
                let progressCmp: TestMatProgressBarComponent;
                it('should set the correct value');
            });
            describe('inputs of FileUploadErrorComponent', () => {
                let parentFixture: ComponentFixture<TestParentComponent>;
                let parentCmpInstance: TestParentComponent;
                beforeEach(() => {
                    parentFixture = TestBed.createComponent(TestParentComponent);
                    parentCmpInstance = parentFixture.debugElement.componentInstance;
                    cmpInstance = parentFixture.debugElement
                        .query(By.directive(FileUploadErrorComponent)).componentInstance;
                });
                it('should create the app', () => {
                    expect(parentCmpInstance).toBeTruthy();
                    expect(cmpInstance).toBeTruthy();
                });
                describe('set the correct uploadFile instance', () => {
                    testFiles.forEach((testFile) => {
                        it('should set the correct mode', () => {
                            parentCmpInstance.testFile = testFile;
                            parentFixture.detectChanges();
                            expect((cmpInstance as any).mUploadFile).toEqual(testFile);
                        });
                    });
                });
            });
        });
    });
});
