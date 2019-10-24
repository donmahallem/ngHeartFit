/*!
 * Source https://github.com/donmahallem/ngHeartFit
 */

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { IUploadFile } from './upload-file.modal';

@Injectable()
export class UploadResolver implements Resolve<IUploadFile[]> {
    constructor() { }

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): IUploadFile[] {
        const uploads: IUploadFile[] = [];
        return uploads;
    }
}
