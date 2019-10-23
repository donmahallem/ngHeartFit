/*!
 * Source https://github.com/donmahallem/ngHeartFit
 */

import { HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import * as moment from 'moment';
import { FitApiBaseService } from './fit-api-base.service';

@Injectable()
export class FitApiDataSetService {
    constructor(private fitApiBaseService: FitApiBaseService) {

    }
    public getDataSetData<T extends FitDatasetPoints>(dataSource: string, from: moment.Moment, to: moment.Moment): Observable<HttpEvent<IFitDatasetResponse<T>>> {
        const url = FitApiBaseService.ENDPOINT + '/users/me/dataSources/' + dataSource + '/datasets/' + from.valueOf() + '000000-' + to.valueOf() + '000000';
        return this.fitApiBaseService.getRequest<IFitDatasetResponse<T>>(url);
    }

    public insertData(dataSourceId: string, from: moment.Moment, to: moment.Moment, points: IInsertDataPoint[]): Observable<HttpEvent<any>> {

        const requestBody: any = {
            minStartTimeNs: from.valueOf() * 1000000,
            maxEndTimeNs: to.valueOf() * 1000000,
            dataSourceId,
            point: points,
        };
        const url = FitApiBaseService.ENDPOINT + '/users/me/dataSources/' + dataSourceId + '/datasets/' + from.valueOf() + '000000-' + to.valueOf() + '000000';

        return this.fitApiBaseService.patchRequest(url, requestBody);
    }
}

export interface IInsertDataPoint {
    'startTimeNanos': number;
    'endTimeNanos': number;
    'dataTypeName': string;
    'value': {
        'fpVal': number;
    }[];
}

export interface IFitDatasetResponse<T extends FitDatasetPoints> {
    dataSourceId: string;
    dataTypeName: string;
    modifiedTimeMillis: string;
    maxEndTimeNs: string;
    minStartTimeNs: string;
    point: T[];
}
export interface IFitDatasetPointValue {

}
export interface IFitDatasetPointFloatValue {
    fpVal: number;
    mapVal: any[];
}

export type FitDatasetPointValues = IFitDatasetPointFloatValue;
export interface IFitDatasetPoint {
    dataTypeName: string;
    endTimeNanos: string;
    modifiedTimeMillis: string;
    originDataSourceId: string;
    startTimeNanos: string;
    value: FitDatasetPointValues[];
}

export interface IFitDatasetPointWeight extends IFitDatasetPoint {
    dataTypeName: 'com.google.weight';
    value: IFitDatasetPointFloatValue[];
}
export interface IFitDatasetPointBodyFatPercentage extends IFitDatasetPoint {
    dataTypeName: 'com.google.body.fat.percentage';
    value: IFitDatasetPointFloatValue[];
}
export type FitDatasetPoints = IFitDatasetPoint | IFitDatasetPointWeight | IFitDatasetPointBodyFatPercentage;
