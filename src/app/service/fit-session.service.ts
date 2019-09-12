
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpParams, HttpRequest, HttpEvent } from '@angular/common/http';

import { FitApiBaseService } from './fit-api-base.service';
import { map, flatMap } from 'rxjs/operators';
import { FitApiDataSetService } from './fit-data-set.service';
import {
    FitSession,
    ListSessionsResponse
} from './fit-api-modals';
import * as moment from 'moment';

@Injectable()
export class FitApiSessionService {
    public static readonly WEIGHT_NAME: string = 'HeartFitWeightUserInput';
    public static readonly DATA_TYPE_WEIGHT: string = 'com.google.weight';
    public static readonly BODY_FAT_PERCENTAGE_NAME: string = 'HeartFitBodyFatPercentageUserInput';
    public static readonly DATA_TYPE_BODY_FAT_PERCENTAGE: string = 'com.google.body.fat.percentage';
    constructor(private fitApiBaseService: FitApiBaseService) {

    }

    public getSession(id: string): Observable<HttpEvent<FitSession>> {
        return this.fitApiBaseService.getRequest(FitApiBaseService.ENDPOINT + '/users/me/sessions/' + id);
    }

    public getSessions(): Observable<HttpEvent<ListSessionsResponse>>;
    public getSessions(startTime: string | null, endTime: string | null, includeDeleted?: boolean): Observable<HttpEvent<ListSessionsResponse>>;
    public getSessions(startTime: string | null = undefined, endTime: string | null = undefined, includeDeleted: boolean = false, pageToken: string = undefined): Observable<HttpEvent<ListSessionsResponse>> {
        const params: any = {};
        if (startTime) {
            params.startTime = startTime;
        }
        if (endTime) {
            params.endTime = endTime;
        }
        params.includeDeleted = includeDeleted === true;
        if (pageToken) {
            params.pageToken = pageToken;
        }
        return this.fitApiBaseService.getRequest(FitApiBaseService.ENDPOINT + '/users/me/sessions/', params);
    }
}
