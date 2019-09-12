import {
    TestBed,
    async,
    ComponentFixture
} from '@angular/core/testing';
import {
    Injectable,
    Component,
    Input
} from '@angular/core';
import {
    UploadDataService,
    UploadFile,
    UploadFiles,
    UploadFileStatus,
    UploadFileError,
    UploadFileResults,
    UploadFileType
} from '../services';

import * as sinon from 'sinon';
import { By } from '@angular/platform-browser';
import { ValidationError } from 'jsonschema';
import { FileUploadLoadedComponent } from './file-upload-loaded.component';
@Injectable()
class TestUploadDataService {
    public update(): void {

    } public setSelected(key: string, selected: boolean): void {
    }
}


@Component({
    selector: 'app-test-parent',
    template: '<app-file-upload-loaded [uploadFile]="testFile"></app-file-upload-loaded>'
})
class TestParentComponent {
    public testFile: UploadFile;
}
@Component({
    // tslint:disable-next-line
    selector: 'mat-slide-toggle',
    template: '<div></div>'
})
class TestMatSlideToggleComponent {
    @Input()
    public checked: boolean;
}
@Component({
    // tslint:disable-next-line
    selector: 'mat-icon',
    template: '<div></div>'
})
class TestMatIconComponent {
}

describe('app/polar/upload/file-upload-loaded.component', () => {
    let sandbox: sinon.SinonSandbox;
    describe('FileUploadLoadedComponent', () => {
        let fixture: ComponentFixture<FileUploadLoadedComponent>;
        let cmpInstance: FileUploadLoadedComponent;
        let uploadDataService: UploadDataService;
        const testFiles: UploadFileResults[] = [
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
                key: 'testFile06.json',
                filename: 'testFile06.json',
                data: <any>'test data to do some stuff two',
                filesize: 8452,
                type: null,
                selected: true,
                status: UploadFileStatus.LOADED
            }
        ];
        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [
                ],
                declarations: [
                    FileUploadLoadedComponent,
                    TestParentComponent,
                    TestMatSlideToggleComponent,
                    TestMatIconComponent
                ],
                providers: [
                    { provide: UploadDataService, useValue: new TestUploadDataService() }
                ]
            }).compileComponents();
        }));
        beforeAll(() => { sandbox = sinon.createSandbox(); });
        afterEach(() => { sandbox.restore(); });
        describe('methods and properties', () => {
            beforeEach(() => {
                fixture = TestBed.createComponent(FileUploadLoadedComponent);
                cmpInstance = fixture.debugElement.componentInstance;
                uploadDataService = fixture.debugElement.injector.get(UploadDataService);
            });
            it('should create the app', () => {
                expect(cmpInstance).toBeTruthy();
            });
            describe('filesize', () => {
                describe('getter', () => {
                    describe('mUploadFile is set', () => {
                        testFiles.forEach((testFile) => {
                            it('should return ' + testFile.filesize, () => {
                                (<any>cmpInstance).mUploadFile = testFile;
                                expect(cmpInstance.filesize).toEqual(testFile.filesize);
                            });
                        });
                    });
                    describe('mUploadFile is not set', () => {
                        it('should return 0', () => {
                            (<any>cmpInstance).mUploadFile = null;
                            expect(cmpInstance.filesize).toEqual(0);
                        });
                    });
                });
            });
            describe('type', () => {
                describe('getter', () => {
                    describe('mUploadFile is set', () => {
                        testFiles.forEach((testFile) => {
                            if (testFile.type) {
                                it('should return ' + testFile.type, () => {
                                    (<any>cmpInstance).mUploadFile = testFile;
                                    expect(cmpInstance.type).toEqual(testFile.type);
                                });
                            } else {
                                it('should return UploadFileType.UNKNOWN', () => {
                                    (<any>cmpInstance).mUploadFile = testFile;
                                    expect(cmpInstance.type).toEqual(UploadFileType.UNKNOWN);
                                });
                            }
                        });
                    });
                    describe('mUploadFile is not set', () => {
                        it('should return UploadFileType.UNKNOWN', () => {
                            (<any>cmpInstance).mUploadFile = null;
                            expect(cmpInstance.type).toEqual(UploadFileType.UNKNOWN);
                        });
                    });
                });
            });
            describe('selected', () => {
                describe('getter', () => {
                    describe('mUploadFile is set', () => {
                        testFiles.forEach((testFile) => {
                            it('should return ' + (testFile.selected !== false), () => {
                                (<any>cmpInstance).mUploadFile = testFile;
                                expect(cmpInstance.selected).toEqual(testFile.selected);
                            });
                        });
                    });
                    describe('mUploadFile is not set', () => {
                        it('should return false', () => {
                            (<any>cmpInstance).mUploadFile = null;
                            expect(cmpInstance.selected).toEqual(false);
                        });
                    });
                });
            });
            describe('typeIcon', () => {
                describe('getter', () => {
                    describe('mUploadFile is set', () => {
                        testFiles.forEach((testFile) => {
                            if (testFile.type === UploadFileType.DAY_SUMMARY) {
                                it('should return "favorite_border"', () => {
                                    (<any>cmpInstance).mUploadFile = testFile;
                                    expect(cmpInstance.typeIcon).toEqual('favorite_border');
                                });
                            } else if (testFile.type === UploadFileType.SLEEP_DATA) {
                                it('should return "brightness_2"', () => {
                                    (<any>cmpInstance).mUploadFile = testFile;
                                    expect(cmpInstance.typeIcon).toEqual('brightness_2');
                                });
                            } else {
                                it('should return "help_outline"', () => {
                                    (<any>cmpInstance).mUploadFile = testFile;
                                    expect(cmpInstance.typeIcon).toEqual('help_outline');
                                });
                            }
                        });
                    });
                    describe('mUploadFile is not set', () => {
                        it('should return false', () => {
                            (<any>cmpInstance).mUploadFile = null;
                            expect(cmpInstance.typeIcon).toEqual('help_outline');
                        });
                    });
                });
            });
            describe('onCheckChange(ev: MatSlideToggleChange)', () => {
                let setSelectedStub: sinon.SinonStub;
                beforeEach(() => {
                    setSelectedStub = sandbox.stub(uploadDataService, 'setSelected');
                });
                describe('element was checked', () => {
                    testFiles.forEach((testFile) => {
                        [true, false].forEach((testCheck) => {
                            it('should call setSelected("' + testFile.key + '",' + testCheck + ')', () => {
                                (<any>cmpInstance).mUploadFile = testFile;
                                cmpInstance.onCheckChange(<any>{ checked: testCheck });
                                expect(setSelectedStub.callCount).toEqual(1);
                                expect(setSelectedStub.getCall(0).args).toEqual([testFile.key, testCheck]);
                            });
                        });
                    });
                });
                describe('mUploadFile is not set', () => {
                    it('should return false', () => {
                        (<any>cmpInstance).mUploadFile = null;
                        cmpInstance.onCheckChange(<any>{ checked: true });
                        expect(setSelectedStub.callCount).toEqual(0);
                    });
                });
            });
        });
        describe('layout', () => {
            describe('child components', () => {
                beforeEach(() => {
                    fixture = TestBed.createComponent(FileUploadLoadedComponent);
                    cmpInstance = fixture.debugElement.componentInstance;
                });
                it('should create the app', () => {
                    expect(cmpInstance).toBeTruthy();
                });
                let progressCmp: TestMatSlideToggleComponent;
                it('should set the correct value');
            });
            describe('inputs of FileUploadLoadedComponent', () => {
                let parentFixture: ComponentFixture<TestParentComponent>;
                let parentCmpInstance: TestParentComponent;
                beforeEach(() => {
                    parentFixture = TestBed.createComponent(TestParentComponent);
                    parentCmpInstance = parentFixture.debugElement.componentInstance;
                    cmpInstance = parentFixture.debugElement
                        .query(By.directive(FileUploadLoadedComponent)).componentInstance;
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
