import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatButtonModule, MatToolbarModule, MatCheckboxChange, MatCheckboxModule, MatGridListModule } from '@angular/material';
import { Observable, from } from 'rxjs';
import { Injectable } from '@angular/core';
import { UploadComponent } from './upload.component';
import { FilePreviewComponent } from './file-preview.component';
import { UploadDataService, UploadFile } from '../services';

import * as sinon from "sinon";

@Injectable()
class testUploadDataService2 {

    public get uploadedFiles(): UploadFile[] {
        return [];
    }
    public update(): void {
    }

    public set uploadedFiles(files: UploadFile[]) {
    }

    public get uploadedFilesObservable(): Observable<UploadFile[]> {
        return null;
    }

    public get uploadableFilesObservable(): Observable<boolean> {
        return null;
    }

    public addUploadFile(f: UploadFile): void {
    }

    public clear(): void {
    }
}
let sandbox;
describe('UploadComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                MatButtonModule,
                MatCheckboxModule,
                MatGridListModule
            ],
            declarations: [
                UploadComponent,
                FilePreviewComponent
            ],
            providers: [
                { provide: UploadDataService, useValue: new testUploadDataService2() }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        //testUploadDataService.
    });

    it('should create the app', () => {
        const fixture = TestBed.createComponent(UploadComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    });
    beforeAll(() => { sandbox = sinon.sandbox.create(); })
    afterEach(() => { sandbox.restore(); })
    describe('uploadFiles()', () => {
        it('should test', () => {
            const fixture = TestBed.createComponent(UploadComponent);
            const app: UploadComponent = fixture.debugElement.componentInstance;
            expect(app).toBeTruthy();
            let service = fixture.debugElement.injector.get(UploadDataService);
            const stub: sinon.SinonStub = sandbox.stub(service, 'uploadedFiles');
            const testData: any[] = [{
                'test': 'data1',
                'test2': 1234
            }, {
                'test': 'data6',
                'test2': 1234436
            }]
            stub.get(() => { return testData });
            expect(app.uploadFiles).toEqual(testData);
            stub.restore();
        });
    });
});
