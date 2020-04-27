/*!
 * Source https://github.com/donmahallem/ngHeartFit
 */

import {
    AfterViewInit,
    Component,
    OnDestroy,
    ViewChild,
} from '@angular/core';
import { MatButton } from '@angular/material/button';
import { Subscription } from 'rxjs';
@Component({
    selector: 'app-profile-view',
    styleUrls: ['./profile.component.scss'],
    templateUrl: './profile.component.pug',
})
export class ProfileComponent implements AfterViewInit, OnDestroy {
    public user: any;
    @ViewChild('btnSignin', { static: false })
    public btnSignIn: MatButton;
    private mIsSignedIn = false;
    private signinSubscription: Subscription;
    constructor() { }
    public ngAfterViewInit(): void {
        /*this.signinSubscription = this.gapiService.getUserObservable()
            .subscribe((res) => {
                const profile: gapi.auth2.BasicProfile = res.getBasicProfile();
                this.user = profile.getName();
                console.log(res.getGrantedScopes(), res, res.getBasicProfile().getGivenName(), res.getBasicProfile().getName());
                this._isSignedIn = true;
            }, (err) => {
                console.error(err);
                this._isSignedIn = false;
                this.user = "errro";
            }, () => {
                this.cd.detectChanges();
            });*/
    }

    public ngOnDestroy(): void {
        if (this.signinSubscription) {
            this.signinSubscription.unsubscribe();
        }
    }

    public get isSignedIn(): boolean {
        return this.mIsSignedIn;
    }

    public signin(event: MouseEvent): void {
        // this.gapiService.
    }
}
