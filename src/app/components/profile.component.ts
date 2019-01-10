import {
    Component,
    OnInit,
    NgZone,
    AfterViewInit,
    ElementRef,
    ViewChild
} from '@angular/core';
import { GapiService } from '../service/gapi.service';
@Component({
    selector: 'profile-view',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    public user: any;
    constructor(private gapiService: GapiService) { }
    public ngOnInit(): void {
        this.gapiService.getSigninStatus()
            .subscribe((res) => {
                if (res == true) {
                    const profile: gapi.auth2.BasicProfile = this.gapiService.getCurrentUser().getBasicProfile();
                    this.user = profile.getName();
                    console.log(this.gapiService.getCurrentUser().getGrantedScopes());
                }
            }, (err) => console.error);
    }
}
