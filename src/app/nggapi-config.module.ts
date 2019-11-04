/*!
 * Source https://github.com/donmahallem/ngHeartFit
 */

import { ModuleWithProviders } from '@angular/compiler/src/core';
import { NgModule } from '@angular/core';
import {
    GoogleApiModule,
    NgGapiClientConfig,
    NG_GAPI_CONFIG,
} from 'ng-gapi';
import { environment } from 'src/environments/environment';
import { NgGapiResolver } from './gapi.resolver';
import {
    FitApiAggregateService,
    FitApiBaseService,
    FitApiDataSetService,
    FitApiDataSourceService,
    FitApiSessionService,
    GapiUserService,
    NgGapiService,
} from './service';

const gapiClientConfig: NgGapiClientConfig = {
    client_id: environment.gapi.client_id,
    discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/fitness/v1/rest'],
    scope: [
        'https://www.googleapis.com/auth/fitness.body.write',
        'https://www.googleapis.com/auth/fitness.nutrition.read',
        'https://www.googleapis.com/auth/fitness.activity.write',
    ].join(' '),
};

@NgModule({
    exports: [GoogleApiModule],
    imports: [GoogleApiModule.forRoot({
        provide: NG_GAPI_CONFIG,
        useValue: gapiClientConfig,
    })],
})
export class NgGapiConfigModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: NgGapiConfigModule,
            providers: [
                GapiUserService,
                NgGapiService,
                FitApiBaseService,
                FitApiDataSetService,
                FitApiDataSourceService,
                FitApiAggregateService,
                FitApiSessionService,
                NgGapiResolver,
            ],
        };
    }
}
