/*!
 * Source https://github.com/donmahallem/ngHeartFit
 */

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { UploadFileResults } from '../services';
import { DataStorageService } from '../services/data-storage.service';

@Injectable()
export class SleepReportResolver implements Resolve<UploadFileResults> {
    constructor(private dataStorageService: DataStorageService,
                private router: Router) { }

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): UploadFileResults {
        if (this.dataStorageService.has(route.params.id)) {
            return this.dataStorageService.getFile(route.params.id);
        } else {
            this.router.navigate(['not-found']);
        }
    }

}
