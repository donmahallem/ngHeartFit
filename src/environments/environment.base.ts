export interface BaseEnvironment {
    production: boolean;
    gapi: {
        client_id: string;
        client_secret: string;
        redirect_uri: string;
    }
}