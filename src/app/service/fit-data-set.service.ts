
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpParams, HttpEvent } from '@angular/common/http';

import { FitApiBaseService } from './fit-api-base.service';
import { map, flatMap } from 'rxjs/operators';
import * as moment from 'moment';

@Injectable()
export class FitApiDataSetService {
    constructor(private fitApiBaseService: FitApiBaseService) {

    }
    public getDataSetData<T extends FitDatasetPoints>(dataSource: string, from: moment.Moment, to: moment.Moment): Observable<HttpEvent<FitDatasetResponse<T>>> {
        const url = FitApiBaseService.ENDPOINT + '/users/me/dataSources/' + dataSource + '/datasets/' + from.valueOf() + '000000-' + to.valueOf() + '000000';
        return this.fitApiBaseService.getRequest<FitDatasetResponse<T>>(url);
    }
}


export interface FitDatasetResponse<T extends FitDatasetPoints> {
    dataSourceId: string,
    maxEndTimeNs: string,
    minStartTimeNs: string,
    point: T[]
}
export interface FitDatasetPointValue {

}
export interface FitDatasetPointFloatValue {
    fpVal: number;
    mapVal: any[];
}

export type FitDatasetPointValues = FitDatasetPointFloatValue;
export interface FitDatasetPoint {
    dataTypeName: string;
    endTimeNanos: string;
    modifiedTimeMillis: string;
    originDataSourceId: string;
    startTimeNanos: string;
    value: FitDatasetPointValues[];
}

export interface FitDatasetPointWeight extends FitDatasetPoint {
    dataTypeName: "com.google.weight";
    value: FitDatasetPointFloatValue[];
}
export interface FitDatasetPointBodyFatPercentage extends FitDatasetPoint {
    dataTypeName: "com.google.body.fat.percentage";
    value: FitDatasetPointFloatValue[];
}
export type FitDatasetPoints = FitDatasetPoint | FitDatasetPointWeight | FitDatasetPointBodyFatPercentage;