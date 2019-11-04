/*!
 * Source https://github.com/donmahallem/ngHeartFit
 */

import { HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IFitDataset, IFitDatasetPoint } from '@donmahallem/google-fit-api-types';
import * as moment from 'moment';
import { FitApiBaseService } from './fit-api-base.service';

@Injectable()
export class FitApiDataSetService {
    constructor(private fitApiBaseService: FitApiBaseService) {

    }
    public getDataSetData<T extends IFitDataset>(dataSource: string,
                                                 from: moment.Moment,
                                                 to: moment.Moment): Observable<HttpEvent<IFitDataset>> {
        const url = FitApiBaseService.ENDPOINT + '/users/me/dataSources/'
            + dataSource + '/datasets/' + from.valueOf() + '000000-' + to.valueOf() + '000000';
        return this.fitApiBaseService.getRequest<IFitDataset>(url);
    }

    public insertData(dataSourceId: string,
                      from: moment.Moment,
                      to: moment.Moment,
                      points: IFitDatasetPoint[]): Observable<HttpEvent<any>> {

        const requestBody: any = {
            dataSourceId,
            maxEndTimeNs: to.valueOf() * 1000000,
            minStartTimeNs: from.valueOf() * 1000000,
            point: points,
        };
        const url = FitApiBaseService.ENDPOINT + '/users/me/dataSources/'
            + dataSourceId + '/datasets/' + from.valueOf() + '000000-'
            + to.valueOf() + '000000';

        return this.fitApiBaseService.patchRequest(url, requestBody);
    }
}
