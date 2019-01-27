import {
    Component,
    OnInit,
    ViewChild,
    AfterViewInit,
    OnDestroy,
    ChangeDetectorRef
} from '@angular/core';
import { MatButton } from '@angular/material';
import { Subscription } from 'rxjs';
import { GapiAuthService } from '../service/gapi-auth.service';
@Component({
    selector: 'profile-view',
    templateUrl: './profile.component.pug',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements AfterViewInit, OnDestroy {
    public user: any;
    @ViewChild("btnSignin")
    public btnSignIn: MatButton;
    private _isSignedIn: boolean = false;
    private signinSubscription: Subscription;
    constructor(private gapiService: GapiAuthService, private cd: ChangeDetectorRef) { }
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
        if (this.signinSubscription)
            this.signinSubscription.unsubscribe();
    }

    public get isSignedIn(): boolean {
        return this._isSignedIn;
    }

    public signin(event: MouseEvent): void {
        //this.gapiService.
    }
}
