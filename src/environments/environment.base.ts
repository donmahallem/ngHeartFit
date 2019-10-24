/*!
 * Source https://github.com/donmahallem/ngHeartFit
 */

export interface IBaseEnvironment {
    production: boolean;
    gapi: {
        client_id: string;
        redirect_uri: string;
    };
}
