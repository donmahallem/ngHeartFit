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
    UploadFileStatus
} from '../services';

import * as sinon from 'sinon';
import { By } from '@angular/platform-browser';
@Injectable()
class TestUploadDataService {
    public update(): void {

    }
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
                data: <any>'test data to do some stuff',
                key: 'testFile1.json',
                type: UploadFileType.DAY_SUMMARY,
                selected: false,
                status: UploadFileStatus.LOADED
            },
            {
                data: <any>'test data to do some stuff two',
                key: 'testFile2.json',
                type: UploadFileType.UNKNOWN,
                valid: true,
                selected: true
            },
            {
                data: <any>'test data to do some stuff three',
                key: 'testFile3.json',
                type: UploadFileType.UNKNOWN,
                valid: false,
                selected: false
            },
            {
                data: <any>'test data to do some stuff four',
                key: 'testFile4.json',
                type: UploadFileType.UNKNOWN,
                valid: false,
                selected: true
            },
            {
                data: <any>'test data to do some stuff four tw',
                key: null,
                type: UploadFileType.UNKNOWN,
                valid: false,
                selected: true
            },
            {
                data: null,
                key: 'testFile5.json',
                type: UploadFileType.UNKNOWN,
                valid: false,
                selected: true
            }
        ];
        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [
                ],
                declarations: [
                    FilePreviewComponent,
                    TestParentComponent,
                    TestSlideToggleComponent
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
                        it('should return ' + testFile.status, () => {
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
                        if (testFile.key) {
                            it('should return ' + testFile.key, () => {
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

        describe('onChangeSelection(event: MatCheckboxChange)', () => {
            describe('called method directly', () => {
                let updateStub: sinon.SinonStub;
                let uploadService: UploadDataService;
                beforeEach(() => {
                    uploadService = fixture.debugElement.injector.get(UploadDataService);
                    updateStub = sandbox.stub(uploadService, 'update');
                });
                testFiles.forEach((testFile: UploadFile) => {
                    [true, false].forEach((checkedValue) => {
                        it('should check ' + JSON.stringify(testFile) + ' as ' + (checkedValue ? 'selected' : 'not selected'), () => {
                            // Needs cloning as objects get modified
                            const testObj: UploadFile = Object.assign({}, testFile);
                            (<any>cmpInstance).mUploadFile = testObj;
                            cmpInstance.onChangeSelection(<any>{
                                checked: checkedValue
                            });
                            expect(updateStub.callCount).toEqual(1);
                            expect(testObj.selected).toEqual(checkedValue);
                            expect((<any>cmpInstance).mUploadFile.selected).toEqual(checkedValue);
                        });
                    });
                });
            });
            describe('called from layout event', () => {
                let onChangeSelectionStub: sinon.SinonStub;
                let slideToggleCmp: TestSlideToggleComponent;
                beforeEach(() => {
                    onChangeSelectionStub = sandbox.stub(cmpInstance, 'onChangeSelection');
                    slideToggleCmp = fixture.debugElement.query(By.directive(TestSlideToggleComponent)).componentInstance;
                });
                testFiles.forEach((testFile: UploadFile) => {
                    it('should call onChangeSelection method on component when clicked ' + testFile.valid, fakeAsync(() => {
                        (<any>cmpInstance).mUploadFile = testFile;
                        const testEvent: any = {
                            checked: testFile.selected
                        };
                        slideToggleCmp.change.next(testEvent);
                        fixture.detectChanges();
                        expect(onChangeSelectionStub.callCount).toEqual(1, 'The event should be called once');
                        expect(onChangeSelectionStub.getCall(0).args[0]).toEqual(testEvent);
                    }));
                });
            });
        });

        describe('Layout', () => {
            describe('after upload file was set', () => {
                let slideToggleCmp: TestSlideToggleComponent;
                let fileSizeSpan: HTMLElement;
                let filenameSpan: HTMLElement;
                beforeEach(() => {
                    slideToggleCmp = fixture.debugElement.query(By.directive(TestSlideToggleComponent)).componentInstance;
                    fileSizeSpan = fixture.debugElement.query(By.css('span.filesize')).nativeElement;
                    filenameSpan = fixture.debugElement.query(By.css('h3.filename')).nativeElement;
                });
                testFiles.forEach((testFile: UploadFile) => {
                    it('should update the toggle properties correctly', () => {
                        (<any>cmpInstance).mUploadFile = testFile;
                        fixture.detectChanges();
                        expect(slideToggleCmp.disabled).toEqual(!testFile.valid,
                            'The toggle should be ' + (testFile.valid ? 'enabled' : 'disabled'));
                        expect(slideToggleCmp.checked).toEqual(testFile.selected && testFile.valid,
                            'The toggle should be ' + ((testFile.selected && testFile.valid) ? 'selected' : 'not selected'));
                    });
                    const correctFileSize: number = (testFile.data ? testFile.data.length : 0);
                    it('should update the displayed filesize to ' + correctFileSize, () => {
                        (<any>cmpInstance).mUploadFile = testFile;
                        fixture.detectChanges();
                        expect(fileSizeSpan.innerText).toEqual('' + correctFileSize);
                    });
                    const correctFilename: string = testFile.filename ? testFile.filename : 'Unknown';
                    it('should display the correct filename "' + correctFilename + '"', () => {
                        (<any>cmpInstance).mUploadFile = testFile;
                        fixture.detectChanges();
                        expect(filenameSpan.innerText).toEqual(correctFilename);
                    });

                    it('should update the displayed errors correctly');
                });
            });
        });
    });
});
