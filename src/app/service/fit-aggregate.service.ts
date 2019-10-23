/*!
 * Source https://github.com/donmahallem/ngHeartFit
 */

import { HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import * as moment from 'moment';
import { flatMap } from 'rxjs/operators';
import { FitApiBaseService } from './fit-api-base.service';
import {
    IBucketResponse,
} from './fit-api-modals';

@Injectable()
export class FitApiAggregateService {
    public static readonly WEIGHT_NAME: string = 'HeartFitWeightUserInput';
    public static readonly DATA_TYPE_WEIGHT: string = 'com.google.weight';
    public static readonly BODY_FAT_PERCENTAGE_NAME: string = 'HeartFitBodyFatPercentageUserInput';
    public static readonly DATA_TYPE_BODY_FAT_PERCENTAGE: string = 'com.google.body.fat.percentage';
    constructor(private fitApiBaseService: FitApiBaseService) {

    }
    public getAggregateData(source: AggregateByFilter[],
                            from: moment.Moment,
                            to: moment.Moment,
                            bucketWindowMillis: number): Observable<HttpEvent<IBucketResponse>> {
        return this.fitApiBaseService.base()
            .pipe(flatMap((): Observable<HttpEvent<IBucketResponse>> => {
                const requestBody: any = {
                    startTimeMillis: from.utc().valueOf(),
                    endTimeMillis: to.utc().valueOf(),
                    aggregateBy: source,
                    bucketByTime: {
                        durationMillis: bucketWindowMillis,
                    },
                };
                const url = FitApiBaseService.ENDPOINT + '/users/me/dataset:aggregate';
                return this.fitApiBaseService.postRequest<any, IBucketResponse>(url, requestBody);
            }));
    }

}

export interface AggregateByFilter {
    dataTypeName?: string;
    dataSourceId?: string;
}
