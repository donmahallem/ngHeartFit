import {
    GoogleApiModule,
    GoogleApiService,
    GoogleAuthService,
    NgGapiClientConfig,
    NG_GAPI_CONFIG,
    GoogleApiConfig
} from 'ng-gapi';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { GapiUserService } from './service/gapi-user.service';
import { environment } from 'src/environments/environment';
import { ngGapiService } from './service/nggapi-base.service';
import { ModuleWithProviders } from '@angular/compiler/src/core';

const gapiClientConfig: NgGapiClientConfig = {
    client_id: environment.gapi.client_id,
    discoveryDocs: ['https://analyticsreporting.googleapis.com/$discovery/rest?version=v4'],
    scope: [
        'https://www.googleapis.com/auth/fitness.body.write',
        'https://www.googleapis.com/auth/fitness.nutrition.read',
        'https://www.googleapis.com/auth/fitness.activity.write'
    ].join(' ')
};

@NgModule({
    imports: [GoogleApiModule.forRoot({
        provide: NG_GAPI_CONFIG,
        useValue: gapiClientConfig
    })],
    exports: [GoogleApiModule]
})
export class NgGapiConfigModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: NgGapiConfigModule,
            providers: [
                GapiUserService,
                ngGapiService
            ]
        };
    }
}
