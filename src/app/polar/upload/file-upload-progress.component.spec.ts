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

describe('app/polar/upload/file-upload-progress.component', () => {
    let sandbox: sinon.SinonSandbox;
    describe('FileUploadProgressComponent', () => {
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
                error: new ValidationError("a random test error"),
                status: UploadFileStatus.ERROR
            }, {
                key: 'testFile08.json',
                filename: 'testFile08.json',
                error: new Error("a random test error"),
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
                        it('should return ' + testFile.status);
                    });
                });
            });
        });
    });
});
