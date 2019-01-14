import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Resolve, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { delay } from "rxjs/operators";
import { UploadDataService } from "./upload-data.service";
import { DaySummary } from "@donmahallem/flowapi";

@Injectable()
export class UploadResolver implements Resolve<DaySummary> {
    constructor(private uploadService: UploadDataService) { }

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): DaySummary {
        return this.uploadService.getData(route.params["id"]);
    }
}