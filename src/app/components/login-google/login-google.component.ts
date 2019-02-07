import {
    Component,
    OnInit,
    ViewChild,
    AfterViewInit,
    OnDestroy,
    ChangeDetectorRef
} from '@angular/core';
import { Subscription } from 'rxjs';
import { GapiUserService } from 'src/app/service/gapi-user.service';
import { FitApiService } from 'src/app/service/fit-api.service';
import { Router } from '@angular/router';
@Component({
    selector: 'login-google-cmp',
    templateUrl: './login-google.component.pug',
    styleUrls: ['./login-google.component.scss']
})
export class LoginGoogleComponent implements OnDestroy, OnInit {
    private mIsButtonDisabled: boolean = true;
    private subs: Subscription[] = [];
    constructor(private gapiUserService: GapiUserService,
        private router: Router, private nggapi: FitApiService) {
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
        for (let sub of this.subs) {
            sub.unsubscribe();
        }
        this.subs = [];
    }
}
