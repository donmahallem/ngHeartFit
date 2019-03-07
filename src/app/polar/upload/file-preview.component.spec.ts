import {
    TestBed,
    async,
    ComponentFixture,
    fakeAsync
} from '@angular/core/testing';
import { MatCheckboxChange } from '@angular/material';
import {
    Injectable,
    Component,
    DebugElement,
    Output,
    EventEmitter,
    Input
} from '@angular/core';
import { FilePreviewComponent } from './file-preview.component';
import {
    UploadDataService,
    UploadFile,
    UploadFileType,
    UploadFiles,
    UploadFileStatus,
    UploadFileResult,
    UploadFileProgress
} from '../services';

import * as sinon from 'sinon';
import { By } from '@angular/platform-browser';
import { ValidationError } from 'jsonschema';
@Injectable()
class TestUploadDataService {
    public update(): void {

    }
}


@Component({
    selector: 'app-file-upload-error',
    template: '<div></div>'
})
class TestFileUploadErrorComponent {
    @Input()
    public uploadFile: UploadFile;
}

@Component({
    selector: 'app-file-upload-progress',
    template: '<div></div>'
})
class TestFileUploadProgressComponent {
    @Input()
    public uploadFile: UploadFile;
}
@Component({
    selector: 'app-file-upload-loaded',
    template: '<div></div>'
})
class TestFileUploadLoadedComponent {
    @Input()
    public uploadFile: UploadFile;
}

@Component({
    selector: 'app-test-parent',
    template: '<app-file-preview [uploadFile]="testFile"></app-file-preview>'
})
class TestParentComponent {
    public testFile: UploadFile;
}

@Component({
    // tslint:disable-next-line
    selector: 'mat-slide-toggle',
    template: '<div></div>'
})
class TestSlideToggleComponent {
    @Output()
    public change: EventEmitter<MatCheckboxChange> = new EventEmitter();

    @Input()
    public checked: boolean;

    @Input()
    public disabled: boolean;
    @Input()
    public labelPosition: string;
}

describe('app/polar/upload/file-preview.component', () => {
    let sandbox: sinon.SinonSandbox;
    describe('FilePreviewComponent', () => {
        let fixture: ComponentFixture<FilePreviewComponent>;
        let cmpInstance: FilePreviewComponent;
        const testFiles: UploadFiles[] = [
            {
                key: 'testFile05.json',
                filename: 'testFile05.json',
                data: <any>'test data to do some stuff',
                filesize: 30303,
                type: UploadFileType.DAY_SUMMARY,
                selected: false,
                status: UploadFileStatus.LOADED
            }, {
                key: 'testFile06.json',
                filename: 'testFile06.json',
                data: <any>'test data to do some stuff two',
                filesize: 51356,
                type: UploadFileType.DAY_SUMMARY,
                selected: true,
                status: UploadFileStatus.LOADED
            }, {
                key: 'testFile05.json',
                filename: 'testFile05.json',
                data: <any>'test data to do some stuff',
                filesize: 4325,
                type: UploadFileType.SLEEP_DATA,
                selected: false,
                status: UploadFileStatus.LOADED
            }, {
                key: 'testFile06.json',
                filename: 'testFile06.json',
                data: <any>'test data to do some stuff two',
                filesize: 8452,
                type: UploadFileType.SLEEP_DATA,
                selected: true,
                status: UploadFileStatus.LOADED
            }, {
                key: 'testFile07.json',
                filename: 'testFile07.json',
                error: new ValidationError('a random test error'),
                status: UploadFileStatus.ERROR
            }, {
                key: 'testFile08.json',
                filename: 'testFile08.json',
                error: new Error('a random test error'),
                status: UploadFileStatus.ERROR
            }, {
                key: 'testFile09.json',
                filename: 'testFile09.json',
                status: UploadFileStatus.INITIALIZING
            }, {
                key: 'testFile10.json',
                filename: 'testFile10.json',
                status: UploadFileStatus.INITIALIZING
            }, {
                key: 'testFile11.json',
                filename: 'testFile11.json',
                lengthComputable: false,
                status: UploadFileStatus.LOADING
            }, {
                key: 'testFile11.json',
                filename: 'testFile11.json',
                totalBytes: 59929,
                currentBytes: 29121,
                lengthComputable: null,
                status: UploadFileStatus.LOADING
            }, {
                key: 'testFile12.json',
                totalBytes: 29929,
                currentBytes: 291,
                filename: 'testFile12.json',
                lengthComputable: true,
                status: UploadFileStatus.LOADING
            }
        ];
        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [
                ],
                declarations: [
                    FilePreviewComponent,
                    TestParentComponent,
                    TestSlideToggleComponent,
                    TestFileUploadProgressComponent,
                    TestFileUploadErrorComponent,
                    TestFileUploadLoadedComponent
                ],
                providers: [
                    { provide: UploadDataService, useValue: new TestUploadDataService() }
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
        describe('methods and properties', () => {
            beforeEach(() => {
                fixture = TestBed.createComponent(FilePreviewComponent);
                cmpInstance = fixture.debugElement.componentInstance;
            });
            it('should create the app', () => {
                expect(cmpInstance).toBeTruthy();
            });
            describe('filename', () => {
                describe('getter', () => {
                    describe('mUploadFile is set', () => {
                        testFiles.forEach((testFile) => {
                            const testValue: string = testFile.filename ? testFile.filename : 'Unknown';
                            it('should return ' + testValue, () => {
                                (<any>cmpInstance).mUploadFile = testFile;
                                expect(cmpInstance.filename).toEqual(testValue);
                            });
                        });
                    });
                    describe('mUploadFile is not set', () => {
                        it('should return "Unknown"', () => {
                            (<any>cmpInstance).mUploadFile = null;
                            expect(cmpInstance.filename).toEqual('Unknown');
                        });
                    });
                });
            });
            describe('isFileLoaded', () => {
                describe('getter', () => {
                    describe('mUploadFile is set', () => {
                        testFiles.forEach((testFile) => {
                            const testValue: boolean = testFile.status === UploadFileStatus.LOADED;
                            it('should return ' + testValue, () => {
                                (<any>cmpInstance).mUploadFile = testFile;
                                expect(cmpInstance.isFileLoaded).toEqual(testValue);
                            });
                        });
                    });
                    describe('mUploadFile is not set', () => {
                        it('should return false', () => {
                            (<any>cmpInstance).mUploadFile = null;
                            expect(cmpInstance.isFileLoaded).toBeFalsy();
                        });
                    });
                });
            });
            describe('isFileErrored', () => {
                describe('getter', () => {
                    describe('mUploadFile is set', () => {
                        testFiles.forEach((testFile) => {
                            const testValue: boolean = testFile.status === UploadFileStatus.ERROR;
                            it('should return ' + testValue, () => {
                                (<any>cmpInstance).mUploadFile = testFile;
                                expect(cmpInstance.isFileErrored).toEqual(testValue);
                            });
                        });
                    });
                    describe('mUploadFile is not set', () => {
                        it('should return false', () => {
                            (<any>cmpInstance).mUploadFile = null;
                            expect(cmpInstance.isFileErrored).toBeFalsy();
                        });
                    });
                });
            });
            describe('isFileProcessing', () => {
                describe('getter', () => {
                    describe('mUploadFile is set', () => {
                        testFiles.forEach((testFile) => {
                            const testValue: boolean = testFile.status === UploadFileStatus.LOADING ||
                                testFile.status === UploadFileStatus.INITIALIZING;
                            it('should return ' + testValue, () => {
                                (<any>cmpInstance).mUploadFile = testFile;
                                expect(cmpInstance.isFileProcessing).toEqual(testValue);
                            });
                        });
                    });
                    describe('mUploadFile is not set', () => {
                        it('should return false', () => {
                            (<any>cmpInstance).mUploadFile = null;
                            expect(cmpInstance.isFileProcessing).toBeFalsy();
                        });
                    });
                });
            });
        });
        describe('layout', () => {
            describe('child components', () => {
                beforeEach(() => {
                    fixture = TestBed.createComponent(FilePreviewComponent);
                    cmpInstance = fixture.debugElement.componentInstance;
                });
                it('should create the app', () => {
                    expect(cmpInstance).toBeTruthy();
                });
                it('should set the correct value');
            });
            describe('inputs of FilePreviewComponent', () => {
                let parentFixture: ComponentFixture<TestParentComponent>;
                let parentCmpInstance: TestParentComponent;
                beforeEach(() => {
                    parentFixture = TestBed.createComponent(TestParentComponent);
                    parentCmpInstance = parentFixture.debugElement.componentInstance;
                    cmpInstance = parentFixture.debugElement
                        .query(By.directive(FilePreviewComponent)).componentInstance;
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
                            expect((<any>cmpInstance).mUploadFile).toEqual(testFile);
                        });
                    });
                });
            });
        });
    });
});
