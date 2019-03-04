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
    UploadFileProgress,
    UploadFileResults,
    UploadFileError
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

describe('app/polar/upload/file-upload-error.component', () => {
    let sandbox: sinon.SinonSandbox;
    describe('FileUploadErrorComponent', () => {
        let fixture: ComponentFixture<FilePreviewComponent>;
        let cmpInstance: FilePreviewComponent;
        const testFiles: UploadFileError[] = [{
            key: 'testFile07.json',
            filename: 'testFile07.json',
            error: new ValidationError("a random test error"),
            status: UploadFileStatus.ERROR
        }, {
            key: 'testFile08.json',
            filename: 'testFile08.json',
            error: new Error("a random test error"),
            status: UploadFileStatus.ERROR
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
                    });
                });
            });
        });
    });
});
