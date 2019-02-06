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
import { GapiUserService } from 'src/app/service/gapi-user.service';
@Component({
    selector: 'login-google-cmp',
    templateUrl: './login-google.component.pug',
    styleUrls: ['./login-google.component.scss']
})
export class LoginGoogleComponent {
    private mIsButtonDisabled: boolean = true;
    constructor(private gapi: GapiUserService) {

    }

    public onClickSignin(event: MouseEvent) {
        this.gapi.signIn();
    }

    public get isButtonDisabled(): boolean {
        return this.mIsButtonDisabled;
    }
}
