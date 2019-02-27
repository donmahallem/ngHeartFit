import {
    Component,
    OnInit,
    OnDestroy
} from '@angular/core';
import { Subscription } from 'rxjs';
import { GapiUserService } from 'src/app/service/gapi-user.service';
import { Router } from '@angular/router';
@Component({
    selector: 'login-google-cmp',
    templateUrl: './login-google.component.pug',
    styleUrls: ['./login-google.component.scss']
})
export class LoginGoogleComponent implements OnDestroy, OnInit {
    private mIsButtonDisabled = true;
    private subs: Subscription[] = [];
    constructor(private gapiUserService: GapiUserService,
        private router: Router) {
    }

    public onClickSignin(event: MouseEvent) {
        this.mIsButtonDisabled = true;
        this.subs.push(this.gapiUserService.signIn()
            .subscribe((res: gapi.auth2.GoogleUser) => {
                this.mIsButtonDisabled = false;
                this.router.navigate(['/']);
            }, console.error));
    }

    public testLoad() {
    }
    public get isButtonDisabled(): boolean {
        return this.mIsButtonDisabled;
    }

    public ngOnInit() {
        this.mIsButtonDisabled = false;
    }

    public ngOnDestroy() {
        for (const sub of this.subs) {
            sub.unsubscribe();
        }
        this.subs = [];
    }
}
