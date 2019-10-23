/*!
 * Source https://github.com/donmahallem/ngHeartFit
 */

export interface BaseEnvironment {
    production: boolean;
    gapi: {
        client_id: string;
        redirect_uri: string;
    };
}
