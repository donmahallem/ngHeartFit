import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Resolve, ActivatedRoute, ActivatedRouteSnapshot } from "@angular/router";
import { delay } from "rxjs/operators";
import { UploadDataService } from "./upload-data.service";
import { DaySummary } from "@donmahallem/flowapi";

@Injectable()
export class UploadResolver implements Resolve<DaySummary> {
    constructor(private uploadService: UploadDataService,
        private route: ActivatedRoute) { }

    public resolve(): DaySummary {
        console.log(this.route.snapshot.paramMap.get("id"));
        return this.uploadService.getData(this.route.snapshot.params["id"]);
    }
}