import { GapiUserService } from "./gapi-user.service";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class TaskListResource {
    private readonly ENDPOINT_URL: string = '/users/@me/lists';
    private authHeader: HttpHeaders = new HttpHeaders();

    constructor(private httpService: HttpClient,
        private userService: GapiUserService) {

        this.authHeader.append('Authorization', 'Bearer ' + userService.getToken())
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