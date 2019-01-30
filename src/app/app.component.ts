import { Component, OnInit, NgZone } from '@angular/core';
import { GapiService } from './service/gapi.service';
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
export class AppComponent {
    private _title: string = "app title";

    constructor(private a:GapiService) {
        a.authRequest(a.getDataSources()).subscribe(console.log,console.error);
     }
}
