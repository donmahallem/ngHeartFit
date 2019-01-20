import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Resolve, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { delay } from "rxjs/operators";
import { UploadDataService } from "./upload-data.service";
import { DaySummary } from "@donmahallem/flowapi";
import { UploadFile } from "./upload-file.modal";

@Injectable()
export class UploadResolver implements Resolve<UploadFile[]> {
    constructor(private uploadService: UploadDataService) { }

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): UploadFile[] {
        const ids: string[] = (<string>route.params["id"]).split(",");
        const uploads: UploadFile[] = [];
        for (let id of ids) {
        }
        return uploads;
    }
}