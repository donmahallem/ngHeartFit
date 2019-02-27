
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpParams, HttpRequest } from '@angular/common/http';

import { FitApiBaseService } from './fit-api-base.service';
import { map, flatMap } from 'rxjs/operators';
import { FitApiDataSetService } from './fit-data-set.service';
import {
    FitSession,
    ListSessionsResponse,
    BucketResponse
} from './fit-api-modals';
import * as moment from "moment";

@Injectable()
export class FitApiAggregateService {
    public static readonly WEIGHT_NAME: string = 'HeartFitWeightUserInput';
    public static readonly DATA_TYPE_WEIGHT: string = 'com.google.weight';
    public static readonly BODY_FAT_PERCENTAGE_NAME: string = 'HeartFitBodyFatPercentageUserInput';
    public static readonly DATA_TYPE_BODY_FAT_PERCENTAGE: string = 'com.google.body.fat.percentage';
    constructor(private fitApiBaseService: FitApiBaseService) {

    }

    public getSession(id: string): Observable<FitSession> {
        return this.fitApiBaseService.getRequest(FitApiBaseService.ENDPOINT + '/users/me/sessions/' + id);
    }

    public getSessions(startTime?: moment.Moment, endTime?: moment.Moment): Observable<ListSessionsResponse> {
        return this.fitApiBaseService.getRequest(FitApiBaseService.ENDPOINT + '/users/me/sessions/');
    }
    public getAggregateData(source: AggregateByFilter[], from: moment.Moment, to: moment.Moment, bucketWindowMillis: number): Observable<BucketResponse> {
        return this.fitApiBaseService.base()
            .pipe(flatMap((): Observable<BucketResponse> => {
                const requestBody: any = {
                    'startTimeMillis': from.utc().valueOf(),
                    'endTimeMillis': to.utc().valueOf(),
                    'aggregateBy': source,
                    'bucketByTime': {
                        'durationMillis': bucketWindowMillis
                    }
                };
                const url = FitApiBaseService.ENDPOINT + '/users/me/dataset:aggregate';
                return this.fitApiBaseService.postRequest<BucketResponse>(url, requestBody);
            }));
    }

}

export interface AggregateByFilter {
    dataTypeName?: string;
    dataSourceId?: string;
}