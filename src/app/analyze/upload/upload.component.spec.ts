import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatButtonModule, MatToolbarModule, MatCheckboxChange, MatCheckboxModule, MatGridListModule } from '@angular/material';
import { Observable, from } from 'rxjs';
import { Injectable } from '@angular/core';
import { UploadComponent } from './upload.component';

@Injectable()
class gUserService {
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
                UploadComponent
            ],
            providers: [
                // { provide: GapiUserService, useValue: gUserService }
            ]
        }).compileComponents();
    }));

    it('should create the app', () => {
        const fixture = TestBed.createComponent(UploadComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    });

});
