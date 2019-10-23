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
    IUploadFile,
    UploadDataService,
    UploadFileResults,
    UploadFileStatus,
    UploadFileType,
} from '../services';

import { By } from '@angular/platform-browser';
import * as sinon from 'sinon';
import { FileUploadLoadedComponent } from './file-upload-loaded.component';
@Injectable()
class TestUploadDataService {
    public update(): void {

    } public setSelected(key: string, selected: boolean): void {
    }
}

@Component({
    selector: 'app-test-parent',
    template: '<app-file-upload-loaded [uploadFile]="testFile"></app-file-upload-loaded>',
})
class TestParentComponent {
    public testFile: IUploadFile;
}
@Component({
    // tslint:disable-next-line
    selector: 'mat-slide-toggle',
    template: '<div></div>',
})
class TestMatSlideToggleComponent {
    @Input()
    public checked: boolean;
}
@Component({
    // tslint:disable-next-line
    selector: 'mat-icon',
    template: '<div></div>',
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
                data: 'test data to do some stuff' as any,
                filename: 'testFile05.json',
                filesize: 30303,
                key: 'testFile05.json',
                selected: false,
                status: UploadFileStatus.LOADED,
                type: UploadFileType.DAY_SUMMARY,
            }, {
                data: 'test data to do some stuff two' as any,
                filename: 'testFile06.json',
                filesize: 51356,
                key: 'testFile06.json',
                selected: true,
                status: UploadFileStatus.LOADED,
                type: UploadFileType.DAY_SUMMARY,
            }, {
                data: 'test data to do some stuff' as any,
                filename: 'testFile05.json',
                filesize: 4325,
                key: 'testFile05.json',
                selected: false,
                status: UploadFileStatus.LOADED,
                type: UploadFileType.SLEEP_DATA,
            }, {
                data: 'test data to do some stuff two' as any,
                filename: 'testFile06.json',
                filesize: 8452,
                key: 'testFile06.json',
                selected: true,
                status: UploadFileStatus.LOADED,
                type: UploadFileType.SLEEP_DATA,
            }, {
                data: 'test data to do some stuff two' as any,
                filename: 'testFile06.json',
                filesize: 8452,
                key: 'testFile06.json',
                selected: true,
                status: UploadFileStatus.LOADED,
                type: undefined,
            },
        ];
        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [
                    FileUploadLoadedComponent,
                    TestParentComponent,
                    TestMatSlideToggleComponent,
                    TestMatIconComponent,
                ],
                imports: [
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
                                (cmpInstance as any).mUploadFile = testFile;
                                expect(cmpInstance.filesize).toEqual(testFile.filesize);
                            });
                        });
                    });
                    describe('mUploadFile is not set', () => {
                        it('should return 0', () => {
                            (cmpInstance as any).mUploadFile = undefined;
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
                                    (cmpInstance as any).mUploadFile = testFile;
                                    expect(cmpInstance.type).toEqual(testFile.type);
                                });
                            } else {
                                it('should return UploadFileType.UNKNOWN', () => {
                                    (cmpInstance as any).mUploadFile = testFile;
                                    expect(cmpInstance.type).toEqual(UploadFileType.UNKNOWN);
                                });
                            }
                        });
                    });
                    describe('mUploadFile is not set', () => {
                        it('should return UploadFileType.UNKNOWN', () => {
                            (cmpInstance as any).mUploadFile = undefined;
                            expect(cmpInstance.type).toEqual(UploadFileType.UNKNOWN);
                        });
                    });
                });
            });
            describe('selected', () => {
                describe('getter', () => {
                    describe('mUploadFile is set', () => {
                        testFiles.forEach((testFile) => {
                            it('should return ' + (testFile.selected), () => {
                                (cmpInstance as any).mUploadFile = testFile;
                                expect(cmpInstance.selected).toEqual(testFile.selected);
                            });
                        });
                    });
                    describe('mUploadFile is not set', () => {
                        it('should return false', () => {
                            (cmpInstance as any).mUploadFile = undefined;
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
                                    (cmpInstance as any).mUploadFile = testFile;
                                    expect(cmpInstance.typeIcon).toEqual('favorite_border');
                                });
                            } else if (testFile.type === UploadFileType.SLEEP_DATA) {
                                it('should return "brightness_2"', () => {
                                    (cmpInstance as any).mUploadFile = testFile;
                                    expect(cmpInstance.typeIcon).toEqual('brightness_2');
                                });
                            } else {
                                it('should return "help_outline"', () => {
                                    (cmpInstance as any).mUploadFile = testFile;
                                    expect(cmpInstance.typeIcon).toEqual('help_outline');
                                });
                            }
                        });
                    });
                    describe('mUploadFile is not set', () => {
                        it('should return false', () => {
                            (cmpInstance as any).mUploadFile = undefined;
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
                                (cmpInstance as any).mUploadFile = testFile;
                                cmpInstance.onCheckChange({ checked: testCheck } as any);
                                expect(setSelectedStub.callCount).toEqual(1);
                                expect(setSelectedStub.getCall(0).args).toEqual([testFile.key, testCheck]);
                            });
                        });
                    });
                });
                describe('mUploadFile is not set', () => {
                    it('should return false', () => {
                        (cmpInstance as any).mUploadFile = undefined;
                        cmpInstance.onCheckChange({ checked: true } as any);
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
                            expect((cmpInstance as any).mUploadFile).toEqual(testFile);
                        });
                    });
                });
            });
        });
    });
});
