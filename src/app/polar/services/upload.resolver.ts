/*!
 * Source https://github.com/donmahallem/ngHeartFit
 */

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { UploadDataService } from './upload-data.service';
import { IUploadFile } from './upload-file.modal';

@Injectable()
export class UploadResolver implements Resolve<IUploadFile[]> {
    constructor(private uploadService: UploadDataService) { }

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): IUploadFile[] {
        const ids: string[] = (route.params.id as string).split(',');
        const uploads: IUploadFile[] = [];
        return uploads;
    }
}
