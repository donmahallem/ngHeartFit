export interface BaseEnvironment {
    production: boolean;
    gapi: {
        client_id: string;
        redirect_url: string;
    };
}
