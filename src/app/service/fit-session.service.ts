/*!
 * Source https://github.com/donmahallem/ngHeartFit
 */

import { HttpEvent, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {
    IFitSession,
    IFitSessionListResponse,
} from '@donmahallem/google-fit-api-types';
import * as  moment from 'moment';
import { FitApiBaseService } from './fit-api-base.service';

@Injectable()
export class FitApiSessionService {
    public static readonly WEIGHT_NAME: string = 'HeartFitWeightUserInput';
    public static readonly DATA_TYPE_WEIGHT: string = 'com.google.weight';
    public static readonly BODY_FAT_PERCENTAGE_NAME: string = 'HeartFitBodyFatPercentageUserInput';
    public static readonly DATA_TYPE_BODY_FAT_PERCENTAGE: string = 'com.google.body.fat.percentage';
    constructor(private fitApiBaseService: FitApiBaseService) {

    }

    public getSession(id: string): Observable<HttpEvent<IFitSession>> {
        return this.fitApiBaseService.getRequest(FitApiBaseService.ENDPOINT + '/users/me/sessions/' + id);
    }

    public getSessions(): Observable<HttpEvent<IFitSessionListResponse>>;
    public getSessions(startTime: moment.Moment | undefined,
                       endTime: moment.Moment | undefined,
                       includeDeleted?: boolean): Observable<HttpEvent<IFitSessionListResponse>>;
    public getSessions(startTime?: moment.Moment | undefined,
                       endTime?: moment.Moment | undefined,
                       includeDeleted: boolean = false,
                       pageToken?: string): Observable<HttpEvent<IFitSessionListResponse>> {
        const params: HttpParams = new HttpParams();
        if (startTime) {
            params.set('startTime', startTime.toISOString());
        }
        if (endTime) {
            params.set('endTime', endTime.toISOString());
        }
        params.set('includeDeleted', includeDeleted ? 'true' : 'false');
        if (pageToken) {
            params.set('pageToken', pageToken);
        }
        return this.fitApiBaseService.getRequest(FitApiBaseService.ENDPOINT + '/users/me/sessions/', params);
    }
}
