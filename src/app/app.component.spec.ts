/*!
 * Source https://github.com/donmahallem/ngHeartFit
 */

import { Component } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ProfileComponent } from './components/profile.component';

@Component({
    selector: 'app-route-loading-indicator',
    template: '<div></div>',
})
class TestRouteLoadingIndicatorComponent {

}

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent,
                ProfileComponent,
                TestRouteLoadingIndicatorComponent,
            ],
            imports: [
                RouterTestingModule,
                MatButtonModule,
                MatToolbarModule,
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
