import { Component, OnInit, NgZone } from '@angular/core';
import { GapiUserService } from './service/gapi-user.service';
/**
 * Listener called when user completes auth flow. If the currentApiRequest
 * variable is set, then the user was prompted to authorize the application
 * before the request executed. In that case, proceed with that API request.
 */
function updateSigninStatus(isSignedIn) {
    console.log("sigin", isSignedIn);
}
@Component({
    selector: 'app-root',
    templateUrl: './app.component.pug',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    private _title: string = "app title";

    public get title(): string {
        return this._title;
    }
    constructor(private gapiService: GapiUserService) { }
    public ngOnInit(): void {
        this.gapiService.isSignedInObservable()
            .subscribe((res) => {
                console.log(res);
            }, console.error);
    }
}
