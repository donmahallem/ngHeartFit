import {
    GoogleApiModule,
    GoogleApiService,
    GoogleAuthService,
    NgGapiClientConfig,
    NG_GAPI_CONFIG,
    GoogleApiConfig
} from "ng-gapi";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { GapiUserService } from "./service/gapi-user.service";

const gapiClientConfig: NgGapiClientConfig = {
    client_id: "CLIENT_ID",
    discoveryDocs: ["https://analyticsreporting.googleapis.com/$discovery/rest?version=v4"],
    scope: [
        "https://www.googleapis.com/auth/analytics.readonly",
        "https://www.googleapis.com/auth/analytics"
    ].join(" ")
};

@NgModule({
    imports: [GoogleApiModule.forRoot({
        provide: NG_GAPI_CONFIG,
        useValue: gapiClientConfig
    })],
    exports: [GoogleApiModule],
    providers: [GapiUserService]
})
export class NgGapiConfigModule { }
