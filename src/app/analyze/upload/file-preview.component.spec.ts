import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatButtonModule, MatToolbarModule, MatCheckboxModule } from '@angular/material';
import { GoogleAuthService } from 'ng-gapi';
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
        const testData: UploadFile = {
            filename: "testname",
            valid: true,
            selected: false,
            data: "testdata",
            key: "923"
        };
        app.uploadFile = testData;
        expect(app.filesize).toEqual(8);
    });

});
