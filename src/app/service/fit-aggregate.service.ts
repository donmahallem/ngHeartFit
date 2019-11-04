/*!
 * Source https://github.com/donmahallem/ngHeartFit
 */

import { HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {
    IFitBucketResponse,
} from '@donmahallem/google-fit-api-types';
import * as moment from 'moment';
import { flatMap } from 'rxjs/operators';
import { FitApiBaseService } from './fit-api-base.service';

@Injectable()
export class FitApiAggregateService {
    public static readonly WEIGHT_NAME: string = 'HeartFitWeightUserInput';
    public static readonly DATA_TYPE_WEIGHT: string = 'com.google.weight';
    public static readonly BODY_FAT_PERCENTAGE_NAME: string = 'HeartFitBodyFatPercentageUserInput';
    public static readonly DATA_TYPE_BODY_FAT_PERCENTAGE: string = 'com.google.body.fat.percentage';
    constructor(private fitApiBaseService: FitApiBaseService) {

    }
    public getAggregateData(source: IAggregateByFilter[],
                            from: moment.Moment,
                            to: moment.Moment,
                            bucketWindowMillis: number): Observable<HttpEvent<IFitBucketResponse>> {
        return this.fitApiBaseService.base()
            .pipe(flatMap((): Observable<HttpEvent<IFitBucketResponse>> => {
                const requestBody: any = {
                    aggregateBy: source,
                    bucketByTime: {
                        durationMillis: bucketWindowMillis,
                    },
                    endTimeMillis: to.utc().valueOf(),
                    startTimeMillis: from.utc().valueOf(),
                };
                const url = FitApiBaseService.ENDPOINT + '/users/me/dataset:aggregate';
                return this.fitApiBaseService.postRequest<any, IFitBucketResponse>(url, requestBody);
            }));
    }

}

// TODO: REMOVE
export interface IAggregateByFilter {
    dataTypeName?: string;
    dataSourceId?: string;
}
