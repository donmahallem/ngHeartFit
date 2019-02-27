import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MatButtonModule, MatToolbarModule } from '@angular/material';
import { ProfileComponent } from './components/profile.component';
import { Observable, from } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
class GUserService {
    public isSignedInObservable(): Observable<boolean> {
        return from([true, false, true]);
    }
}

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                MatButtonModule,
                MatToolbarModule
            ],
            declarations: [
                AppComponent,
                ProfileComponent
            ],
            providers: [
            ]
        }).compileComponents();
    }));

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    });

});
