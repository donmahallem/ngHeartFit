/*!
 * Source https://github.com/donmahallem/ngHeartFit
 */

import {
    Component,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { GapiUserService } from 'src/app/service/gapi-user.service';
@Component({
    selector: 'app-profile-page',
    styleUrls: ['./profile.component.scss'],
    templateUrl: './profile.component.pug',
})
export class ProfileComponent implements OnInit, OnDestroy {
    public user: gapi.auth2.GoogleUser;
    private subscription: Subscription;
    constructor(private gapi: GapiUserService) { }
    public ngOnInit(): void {
        this.subscription = this.gapi.userObservable
            .subscribe((val) => {
                this.user = val;
            });
    }

    public get name(): string {
        if (this.user) {
            return this.user.getBasicProfile().getName();
        }
        return '---';
    }

    public get profileImgUrl(): string {
        if (this.user) {
            return this.user.getBasicProfile().getImageUrl();
        }
        return '---';
    }

    public ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

}
