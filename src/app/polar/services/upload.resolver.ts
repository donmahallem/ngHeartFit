/*!
 * Source https://github.com/donmahallem/ngHeartFit
 */

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { UploadDataService } from './upload-data.service';
import { UploadFile } from './upload-file.modal';

@Injectable()
export class UploadResolver implements Resolve<UploadFile[]> {
    constructor(private uploadService: UploadDataService) { }

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): UploadFile[] {
        const ids: string[] = (route.params.id as string).split(',');
        const uploads: UploadFile[] = [];
        for (const id of ids) {
        }
        return uploads;
    }
}
