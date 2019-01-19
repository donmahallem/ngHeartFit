import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatButtonModule, MatToolbarModule, MatCheckboxChange, MatCheckboxModule, MatGridListModule } from '@angular/material';
import { Observable, from } from 'rxjs';
import { Injectable } from '@angular/core';
import { UploadComponent } from './upload.component';
import { FilePreviewComponent } from './file-preview.component';
import { UploadDataService } from '../services';


@Injectable()
class testUploadDataService {
    public isSignedInObservable(): Observable<boolean> {
        return from([true, false, true]);
    }
}

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
                { provide: UploadDataService, useValue: testUploadDataService }
            ]
        }).compileComponents();
    }));

    it('should create the app', () => {
        const fixture = TestBed.createComponent(UploadComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    });

});
