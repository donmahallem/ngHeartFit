import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatButtonModule, MatToolbarModule, MatCheckboxModule } from '@angular/material';
import { Observable, from } from 'rxjs';
import { Injectable } from '@angular/core';
import { FilePreviewComponent } from './file-preview.component';
import { UploadDataService, UploadFile } from '../services';

@Injectable()
class testUploadDataService {
    public isSignedInObservable(): Observable<boolean> {
        return from([true, false, true]);
    }
}

describe('FilePreviewComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                MatButtonModule,
                MatToolbarModule,
                MatCheckboxModule
            ],
            declarations: [
                FilePreviewComponent
            ],
            providers: [
                { provide: UploadDataService, useValue: testUploadDataService }
            ]
        }).compileComponents();
    }));

    it('should create the app', () => {
        const fixture = TestBed.createComponent(FilePreviewComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    });

    it('file upload is set', () => {
        const fixture = TestBed.createComponent(FilePreviewComponent);
        const app: FilePreviewComponent = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
        const testData: UploadFile[] = [{
            filename: "testname",
            valid: true,
            selected: false,
            data: "testdata",
            key: "923"
        }, {
            filename: "testname2",
            valid: false,
            selected: true,
            data: "testdata2",
            key: "923asdf"
        }];
        for (let tdata of testData) {
            app.uploadFile = tdata;
            expect(app.filesize).toEqual(tdata.data.length);
            expect(app.filename).toEqual(tdata.filename);
            expect(app.isValidFile).toEqual(tdata.valid);
        }
    });
    it('file upload is not set', () => {
        const fixture = TestBed.createComponent(FilePreviewComponent);
        const app: FilePreviewComponent = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
        expect(app.filesize).toEqual(0);
        expect(app.filename).toEqual("Unknown");
        expect(app.isValidFile).toEqual(false);
    });

});
