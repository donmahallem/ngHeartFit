
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpParams, HttpRequest } from '@angular/common/http';

import { FitApiBaseService } from './fit-api-base.service';
import { map, flatMap } from 'rxjs/operators';
import { FitApiDataSetService } from './fit-data-set.service';

@Injectable()
export class FitApiDataSourceService {
    public static readonly WEIGHT_NAME: string = 'HeartFitWeightUserInput';
    public static readonly DATA_TYPE_WEIGHT: string = 'com.google.weight';
    public static readonly BODY_FAT_PERCENTAGE_NAME: string = 'HeartFitBodyFatPercentageUserInput';
    public static readonly DATA_TYPE_BODY_FAT_PERCENTAGE: string = 'com.google.body.fat.percentage';
    constructor(private fitApiBaseService: FitApiBaseService) {

    }

    public submitBodyMetrics(a: any): Observable<any> {
        return null;
    }

    public getDataSources(dataTypeName?: string[] | string): Observable<FitDataSourceList> {
        const params: HttpParams | {
            [param: string]: string | string[];
        } = {};
        if (dataTypeName) {
            params['dataTypeName'] = dataTypeName;
        }
        return this.fitApiBaseService.getRequest(FitApiBaseService.ENDPOINT + '/users/me/dataSources', params);
    }

    public getDataSource(id: string): Observable<FitDataSource> {
        return this.fitApiBaseService.getRequest(FitApiBaseService.ENDPOINT + '/users/me/dataSources/' + id);
    }

    public createDataSourceMetaData(dataType: DataType, dataStreamName?: string): CreateDataSourceRequest {
        return {
            'dataStreamName': dataStreamName,
            'type': 'raw',
            'application': {
                'detailsUrl': 'https://donmahallem.github.io/ngHeartFit',
                'name': 'HeartFit',
                'version': '1'
            },
            'dataType': dataType,
            'device': {
                'manufacturer': navigator.appCodeName,
                'model': navigator.appName,
                'type': 'unknown',
                'uid': navigator.userAgent,
                'version': navigator.appVersion
            }
        };
    }

    public createWeightDatasource(): Observable<any> {
        return this.createDataSource(this.createDataSourceMetaData({
            'field': [
                {
                    'name': 'weight',
                    'format': 'floatPoint'
                }
            ],
            'name': FitApiDataSourceService.DATA_TYPE_WEIGHT
        }, FitApiDataSourceService.WEIGHT_NAME));
    }

    public createBodyFatPercentageDatasource(): Observable<any> {
        return this.createDataSource(this.createDataSourceMetaData({
            'field': [
                {
                    'name': 'percentage',
                    'format': 'floatPoint'
                }
            ],
            'name': FitApiDataSourceService.DATA_TYPE_BODY_FAT_PERCENTAGE
        }, FitApiDataSourceService.BODY_FAT_PERCENTAGE_NAME));
    }

    public createDataSource(datasource: CreateDataSourceRequest): Observable<any> {
        return this.fitApiBaseService.postRequest(FitApiBaseService.ENDPOINT + '/users/me/dataSources', datasource);
    }

    public getOrCreateBodyFatPercentageDataSource(): Observable<FitDataSource> {
        return this.getDataSources(FitApiDataSourceService.DATA_TYPE_BODY_FAT_PERCENTAGE)
            .pipe(flatMap((dataSources: FitDataSourceList) => {
                for (const source of dataSources.dataSource) {
                    if (source.dataStreamName === FitApiDataSourceService.BODY_FAT_PERCENTAGE_NAME && source.device.uid === navigator.userAgent) {
                        return of(source);
                    }
                }
                return this.createBodyFatPercentageDatasource();
            }));
    }

    public getOrCreateWeightDataSource(): Observable<FitDataSource> {
        return this.getDataSources(FitApiDataSourceService.DATA_TYPE_WEIGHT)
            .pipe(flatMap((dataSources: FitDataSourceList) => {
                for (const source of dataSources.dataSource) {
                    if (source.dataStreamName === FitApiDataSourceService.WEIGHT_NAME && source.device.uid === navigator.userAgent) {
                        return of(source);
                    }
                }
                return this.createWeightDatasource();
            }));
    }
    public getOrCreateWeightDataSource2(): Observable<FitDataSource> {
        const req1: HttpRequest<any> = this.fitApiBaseService.createGetRequest(FitApiBaseService.ENDPOINT + '/users/me/dataSources');
        const req2: HttpRequest<any> = this.fitApiBaseService.createGetRequest(FitApiBaseService.ENDPOINT + '/users/me/dataSources');
        return <any>this.fitApiBaseService
            .executeBatchRequest({
                res1: req1,
                res2: req2
            });
    }

    public getOrCreateDataSource(dataType: DataTypes, streamName: string) {
        return null;
    }
}
export enum DataTypes {
    WEIGHT = 'com.google.weight',
    BODY_FAT_PERCENTAGE = 'com.google.body.fat.percentage'
}
export interface FitDataSourceList {
    dataSource: FitDataSource[];
}

export interface FitDataSource {
    application: {
        version: string,
        detailsUrl: string,
        name: string
    };
    dataQualityStandard: [];
    dataStreamId: string;
    dataStreamName: string;
    dataType: {
        name: string,
        field: {
            name: string,
            format: 'blob' | 'floatList' | 'floatPoint' | 'integer' | 'integerList' | 'map' | 'string'
        }[]
    };
    device: {
        uid: string,
        type: 'chestStrap' | 'headMounted' | 'phone' | 'scale' | 'tablet' | 'unknown' | 'watch',
        version: string,
        model: string,
        manufacturer: string
    };
    type: 'derived' | 'raw';
}

export interface DataType {
    'name': string;
    'field': {
        'name': string;
        'format': 'blob' | 'floatList' | 'floatPoint' | 'integer' | 'integerList' | 'map' | 'string';
        'optional'?: boolean;
    }[];
}
export interface CreateDataSourceRequest {
    'dataStreamName'?: string;
    'type': 'raw' | 'derived';
    'application'?: {
        'detailsUrl': string;
        'name': string;
        'version': string;
    };
    'dataType': DataType;
    'device': {
        'manufacturer': string;
        'model': string;
        'type': 'chestStrap' | 'headMounted' | 'phone' | 'scale' | 'tablet' | 'unknown' | 'watch';
        'uid': string;
        'version': string;
    };
}
