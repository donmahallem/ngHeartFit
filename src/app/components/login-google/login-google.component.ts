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
import { ActivatedRoute, Router } from '@angular/router';
import { GapiUserService } from 'src/app/service/gapi-user.service';
@Component({
    selector: 'login-google-cmp',
    templateUrl: './login-google.component.pug',
    styleUrls: ['./login-google.component.scss']
})
export class LoginGoogleComponent implements OnDestroy, OnInit {
    private mIsButtonDisabled: boolean = true;
    private subs: Subscription[] = [];
    constructor(private gapi: GapiUserService,
        private router: Router) {

    }

    public onClickSignin(event: MouseEvent) {
        this.mIsButtonDisabled = true;
        this.subs.push(this.gapi.signIn()
            .subscribe((res: gapi.auth2.GoogleUser) => {
                console.log(res);
                this.mIsButtonDisabled = false;
                this.router.navigate(['/']);
            }, console.error));
    }

    public get isButtonDisabled(): boolean {
        return this.mIsButtonDisabled;
    }

    public ngOnInit() {
        this.mIsButtonDisabled = false;
    }

    public ngOnDestroy() {
        for (let sub of this.subs) {
            sub.unsubscribe();
        }
        this.subs = [];
    }
}
