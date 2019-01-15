import { GapiUserService } from "./gapi-user.service";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { FitDatasource } from "./fit-datasource.modal";
import { map, flatMap } from "rxjs/operators";

@Injectable()
export class FitApiService {
    private readonly BASE_URL: string = "https://www.googleapis.com/fitness/v1/";
    private readonly ENDPOINT_URL: string = '/users/@me/lists';
    private authHeader: HttpHeaders = new HttpHeaders();

    constructor(private httpService: HttpClient,
        private userService: GapiUserService) {

    }

    public getAllDataSources(): Observable<FitDatasource> {
        return this.createHeader()
            .pipe(flatMap((headers) => {
                return this.httpService.get(this.BASE_URL + "users/me/dataSources", { headers: headers })
            }));
    }

    private createHeader(): Observable<HttpHeaders> {
        return this.userService.getToken2()
            .pipe(map((token: string) => {
                const header: HttpHeaders = new HttpHeaders();
                header.append('Authorization', 'Bearer ' + token);
                return header;
            }))
    }

    findAll(): Observable<TasklistListResponse> {
        return <any>this.httpService.get(this.ENDPOINT_URL, { headers: this.authHeader });
    }

    findById(id: string): Observable<Tasklist> {
        return this.httpService.get(this.ENDPOINT_URL + "/" + id, { headers: this.authHeader })
    }

    create(tasklist: Tasklist): Observable<Tasklist> {
        return this.httpService.post(this.ENDPOINT_URL, tasklist, { headers: this.authHeader })
    }

    update(tasklist: Tasklist): Observable<Tasklist> {
        return this.httpService.put(this.ENDPOINT_URL + "/" + tasklist.id, tasklist, { headers: this.authHeader })
    }

    delete(id: string): Observable<Object> {
        return this.httpService.delete(this.ENDPOINT_URL + "/" + id, { headers: this.authHeader })
    }
}
export interface TasklistListResponse {
    items: Tasklist[];
}

export interface Tasklist {
    id?: string;
}