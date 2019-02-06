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
import { GapiAuthService } from '../../service/gapi-auth.service';
import { ActivatedRoute } from '@angular/router';
@Component({
    selector: 'login-google-cmp',
    templateUrl: './login-google.component.pug',
    styleUrls: ['./login-google.component.scss']
})
export class LoginGoogleComponent {
    public signin_url: string;
    @ViewChild("btnSignin")
    public btnSignIn: MatButton;
    private _isSignedIn: boolean = false;
    private signinSubscription: Subscription;
    constructor(private gapiService: GapiAuthService,
        private cd: ChangeDetectorRef,
        private activatedRoute: ActivatedRoute) {
        console.log(activatedRoute.snapshot.data);
        this.signin_url = activatedRoute.snapshot.data.signin_url;
    }
}
