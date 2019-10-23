/*!
 * Source https://github.com/donmahallem/ngHeartFit
 */

import { Component, Injectable } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { MatButtonModule, MatToolbarModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { from, Observable } from 'rxjs';
import { AppComponent } from './app.component';
import { ProfileComponent } from './components/profile.component';

@Injectable()
class GUserService {
    public isSignedInObservable(): Observable<boolean> {
        return from([true, false, true]);
    }
}

@Component({
    selector: 'app-route-loading-indicator',
    template: '<div></div>',
})
class TestRouteLoadingIndicator {

}

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                MatButtonModule,
                MatToolbarModule,
            ],
            declarations: [
                AppComponent,
                ProfileComponent,
                TestRouteLoadingIndicator,
            ],
            providers: [
            ],
        }).compileComponents();
    }));

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    });

});
