import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatButtonModule, MatToolbarModule, MatCheckboxModule, MatSlideToggle, MatSlideToggleModule } from '@angular/material';
import { Observable, from } from 'rxjs';
import { Injectable, Component, DebugElement } from '@angular/core';
import { FilePreviewComponent } from './file-preview.component';
import { UploadDataService, UploadFile, UploadFileType } from '../services';

import * as sinon from 'sinon';
import { By } from '@angular/platform-browser';
@Injectable()
class testUploadDataService {
    public isSignedInObservable(): Observable<boolean> {
        return from([true, false, true]);
    }
}


@Component({
    selector: 'app-test-parent',
    template: '<app-file-preview [uploadFile]="testFile"></app-file-preview>'
})
class TestParentComponent {
    public testFile: UploadFile;
}

describe('app/polar/upload/file-preview.component', () => {
    let sandbox: sinon.SinonSandbox;
    describe('FilePreviewComponent', () => {
        let fixture: ComponentFixture<FilePreviewComponent>;
        let cmpInstance: FilePreviewComponent;
        const testFiles: UploadFile[] = [
            {
                data: 'test data to do some stuff',
                filename: 'testFile1.json',
                type: UploadFileType.UNKNOWN,
                valid: true,
                selected: false
            },
            {
                data: 'test data to do some stuff two',
                filename: 'testFile2.json',
                type: UploadFileType.UNKNOWN,
                valid: true,
                selected: true
            },
            {
                data: 'test data to do some stuff three',
                filename: 'testFile3.json',
                type: UploadFileType.UNKNOWN,
                valid: false,
                selected: false
            },
            {
                data: 'test data to do some stuff four',
                filename: 'testFile4.json',
                type: UploadFileType.UNKNOWN,
                valid: false,
                selected: true
            },
            {
                data: 'test data to do some stuff four',
                filename: null,
                type: UploadFileType.UNKNOWN,
                valid: false,
                selected: true
            },
            {
                data: null,
                filename: 'testFile5.json',
                type: UploadFileType.UNKNOWN,
                valid: false,
                selected: true
            }
        ];
        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [
                    MatSlideToggleModule
                ],
                declarations: [
                    FilePreviewComponent,
                    TestParentComponent
                ],
                providers: [
                    { provide: UploadDataService, useValue: testUploadDataService }
                ]
            }).compileComponents();
        }));
        beforeEach(() => {
            fixture = TestBed.createComponent(FilePreviewComponent);
            cmpInstance = fixture.debugElement.componentInstance;
        });
        it('should create the app', () => {
            expect(cmpInstance).toBeTruthy();
        });
        beforeAll(() => { sandbox = sinon.createSandbox(); });
        afterEach(() => { sandbox.restore(); });
        describe('isValidFile', () => {
            describe('getter', () => {
                describe('mUploadFile is not set', () => {
                    it('should return false for no upload file being set', () => {
                        (<any>cmpInstance).mUploadFile = null;
                        expect(cmpInstance.isValidFile).toBeFalsy('should be false');
                    });
                });
                describe('mUploadFile is set', () => {
                    testFiles.forEach((testFile: UploadFile) => {
                        it('should return ' + testFile.valid, () => {
                            (<any>cmpInstance).mUploadFile = testFile;
                            expect(cmpInstance.isValidFile).toEqual(testFile.valid, 'should be equal');
                        });
                    });
                });
            });
        });
        describe('filename', () => {
            describe('getter', () => {
                describe('mUploadFile is not set', () => {
                    it('should return false for no upload file being set', () => {
                        (<any>cmpInstance).mUploadFile = null;
                        expect(cmpInstance.filename).toEqual('Unknown');
                    });
                });
                describe('mUploadFile is set', () => {
                    testFiles.forEach((testFile: UploadFile) => {
                        if (testFile.filename) {
                            it('should return ' + testFile.filename, () => {
                                (<any>cmpInstance).mUploadFile = testFile;
                                expect(cmpInstance.filename).toEqual(testFile.filename, 'should be equal');
                            });
                        } else {
                            it('should return "Unknown" if data is not set', () => {
                                (<any>cmpInstance).mUploadFile = testFile;
                                expect(cmpInstance.filename).toEqual('Unknown', 'should be equal');
                            });
                        }
                    });
                });
            });
        });
        describe('filesize', () => {
            describe('getter', () => {
                describe('mUploadFile is not set', () => {
                    it('should return false for no upload file being set', () => {
                        (<any>cmpInstance).mUploadFile = null;
                        expect(cmpInstance.filesize).toEqual(0);
                    });
                });
                describe('mUploadFile is set', () => {
                    testFiles.forEach((testFile: UploadFile) => {
                        if (testFile.data) {
                            it('should return ' + testFile.data.length, () => {
                                (<any>cmpInstance).mUploadFile = testFile;
                                expect(cmpInstance.filesize).toEqual(testFile.data.length, 'should be equal');
                            });
                        } else {
                            it('should return 0 if data is not set', () => {
                                (<any>cmpInstance).mUploadFile = testFile;
                                expect(cmpInstance.filesize).toEqual(0, 'should be equal');
                            });
                        }
                    });
                });
            });
        });

        describe('isSelected', () => {
            describe('getter', () => {
                describe('mUploadFile is not set', () => {
                    it('should return false for no upload file being set', () => {
                        (<any>cmpInstance).mUploadFile = null;
                        expect(cmpInstance.filesize).toEqual(0);
                    });
                });
                describe('mUploadFile is set', () => {
                    testFiles.forEach((testFile: UploadFile) => {
                        const expectedTestResult: boolean = testFile.valid && testFile.selected;
                        it('should return ' + expectedTestResult, () => {
                            (<any>cmpInstance).mUploadFile = testFile;
                            expect(cmpInstance.isSelected).toEqual(expectedTestResult, 'should be equal');
                        });
                    });
                });
            });
        });
        describe('uploadFile', () => {
            describe('getter', () => {
                testFiles.forEach((testFile: UploadFile) => {
                    it('should return ' + JSON.stringify(testFile), () => {
                        (<any>cmpInstance).mUploadFile = testFile;
                        expect(cmpInstance.uploadFile).toEqual(testFile, 'should be equal');
                    });
                });
            });
            describe('setter', () => {
                testFiles.forEach((testFile: UploadFile) => {
                    it('should set ' + JSON.stringify(testFile), () => {
                        cmpInstance.uploadFile = testFile;
                        expect((<any>cmpInstance).mUploadFile).toEqual(testFile, 'should be equal');
                    });
                });
            });

            describe('Input annotation', () => {
                let testParentFixture: ComponentFixture<TestParentComponent>;
                let testParentInstance: TestParentComponent;
                let child: FilePreviewComponent;
                let childFixture: DebugElement;
                beforeEach(() => {
                    testParentFixture = TestBed.createComponent(TestParentComponent);
                    testParentInstance = testParentFixture.debugElement.componentInstance;
                    childFixture = testParentFixture.debugElement.query(By.directive(FilePreviewComponent));
                    child = childFixture.componentInstance;
                });
                testFiles.forEach((testFile: UploadFile) => {
                    it('should set the correct value ' + JSON.stringify(testFile), () => {
                        expect(child).toBeTruthy();
                        testParentFixture.detectChanges();
                        testParentInstance.testFile = testFile;
                        testParentFixture.detectChanges();
                        expect((<any>child).mUploadFile).toEqual(testFile, 'should be set');
                    });
                });
            });
        });


    });
});
