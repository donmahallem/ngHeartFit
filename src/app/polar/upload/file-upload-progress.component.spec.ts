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
    UploadFileStatus
} from '../services';

import * as sinon from 'sinon';
import { FileUploadProgressComponent } from './file-upload-progress.component';
@Injectable()
class TestUploadDataService {
    public update(): void {

    }
}


@Component({
    selector: 'app-test-parent',
    template: '<app-file-upload-progress [uploadFile]="testFile"></app-file-upload-progress>'
})
class TestParentComponent {
    public testFile: UploadFile;
}
@Component({
    // tslint:disable-next-line
    selector: 'mat-progress-bar',
    template: '<div></div>'
})
class TestMatProgressBarComponent {
    @Input()
    public mode: 'determinate' | 'indeterminate' | 'buffer' | 'query';
}

describe('app/polar/upload/file-upload-progress.component', () => {
    let sandbox: sinon.SinonSandbox;
    describe('FileUploadProgressComponent', () => {
        let fixture: ComponentFixture<FileUploadProgressComponent>;
        let cmpInstance: FileUploadProgressComponent;
        const testFiles: UploadFiles[] = [{
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
            totalBytes: 594229,
            currentBytes: 29153,
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
                    FileUploadProgressComponent,
                    TestParentComponent,
                    TestMatProgressBarComponent
                ],
                providers: [
                    { provide: UploadDataService, useValue: new TestUploadDataService() }
                ]
            }).compileComponents();
        }));
        beforeEach(() => {
            fixture = TestBed.createComponent(FileUploadProgressComponent);
            cmpInstance = fixture.debugElement.componentInstance;
        });
        it('should create the app', () => {
            expect(cmpInstance).toBeTruthy();
        });
        beforeAll(() => { sandbox = sinon.createSandbox(); });
        afterEach(() => { sandbox.restore(); });
        describe('progressBarMode', () => {
            describe('getter', () => {
                describe('mUploadFile is set', () => {
                    testFiles.forEach((testFile) => {
                        let expectedValue: 'determinate' | 'indeterminate' | 'buffer' | 'query' = 'buffer';
                        switch (testFile.status) {
                            case UploadFileStatus.INITIALIZING:
                                expectedValue = 'query';
                                break;
                            case UploadFileStatus.LOADED:
                            case UploadFileStatus.ERROR:
                                // already set
                                break;
                            case UploadFileStatus.LOADING:
                                if (testFile.lengthComputable === true) {
                                    expectedValue = 'determinate';
                                } else {
                                    expectedValue = 'indeterminate';
                                }
                                break;

                        }
                        it('should return ' + expectedValue, () => {
                            (<any>cmpInstance).mUploadFile = testFile;
                            expect(cmpInstance.progressBarMode).toEqual(expectedValue);
                        });
                    });
                });
                describe('mUploadFile is not set', () => {
                    it('should return buffer', () => {
                        (<any>cmpInstance).mUploadFile = null;
                        expect(cmpInstance.progressBarMode).toEqual('buffer');
                    });
                });
            });
        });
        describe('currentProgress', () => {
            describe('getter', () => {
                describe('mUploadFile is set', () => {
                    testFiles.forEach((testFile) => {
                        if (testFile.status === UploadFileStatus.LOADING && testFile.lengthComputable === true) {
                            it('should return ' + testFile.currentBytes, () => {
                                (<any>cmpInstance).mUploadFile = testFile;
                                expect(cmpInstance.currentProgress).toEqual(testFile.currentBytes);
                            });
                        } else {
                            it('should return 0', () => {
                                (<any>cmpInstance).mUploadFile = testFile;
                                expect(cmpInstance.currentProgress).toEqual(0);
                            });
                        }
                    });
                });
                describe('mUploadFile is not set', () => {
                    it('should return buffer', () => {
                        (<any>cmpInstance).mUploadFile = null;
                        expect(cmpInstance.currentProgress).toEqual(0);
                    });
                });
            });
        });
        describe('totalProgress', () => {
            describe('getter', () => {
                describe('mUploadFile is set', () => {
                    testFiles.forEach((testFile) => {
                        if (testFile.status === UploadFileStatus.LOADING && testFile.lengthComputable === true) {
                            it('should return ' + testFile.totalBytes, () => {
                                (<any>cmpInstance).mUploadFile = testFile;
                                expect(cmpInstance.totalProgress).toEqual(testFile.totalBytes);
                            });
                        } else {
                            it('should return 0', () => {
                                (<any>cmpInstance).mUploadFile = testFile;
                                expect(cmpInstance.totalProgress).toEqual(0);
                            });
                        }
                    });
                });
                describe('mUploadFile is not set', () => {
                    it('should return buffer', () => {
                        (<any>cmpInstance).mUploadFile = null;
                        expect(cmpInstance.totalProgress).toEqual(0);
                    });
                });
            });
        });
    });
});
