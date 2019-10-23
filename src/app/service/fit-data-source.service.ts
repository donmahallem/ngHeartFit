/*!
 * Source https://github.com/donmahallem/ngHeartFit
 */


import { HttpEvent, HttpEventType, HttpParams, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';

import { filter, flatMap } from 'rxjs/operators';
import { FitApiBaseService } from './fit-api-base.service';

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

    public getDataSources(dataTypeName?: string[] | string): Observable<HttpEvent<FitDataSourceList>> {
        const params: HttpParams | {
            [param: string]: string | string[];
        } = {};
        if (dataTypeName) {
            params.dataTypeName = dataTypeName;
        }
        return this.fitApiBaseService.getRequest(FitApiBaseService.ENDPOINT + '/users/me/dataSources', params);
    }

    public getDataSource(id: string): Observable<HttpEvent<FitDataSource>> {
        return this.fitApiBaseService.getRequest(FitApiBaseService.ENDPOINT + '/users/me/dataSources/' + encodeURI(id.replace(' ', '\ ')));
    }

    public createDataSourceMetaData(dataType: DataType, dataStreamName?: string): CreateDataSourceRequest {
        return {
            dataStreamName,
            type: 'raw',
            application: {
                detailsUrl: 'https://donmahallem.github.io/ngHeartFit',
                name: 'HeartFit',
                version: '1',
            },
            dataType,
            device: {
                manufacturer: navigator.appCodeName.replace(/[^\w]/gi, ''),
                model: navigator.appName.replace(/[^\w]/gi, ''),
                type: 'unknown',
                uid: navigator.userAgent.replace(/[^\w]/gi, ''),
                version: navigator.appVersion.replace(/[^\w]/gi, ''),
            },
        };
    }

    public createWeightDatasource(): Observable<any> {
        return this.createDataSource(this.createDataSourceMetaData({
            field: [
                {
                    name: 'weight',
                    format: 'floatPoint',
                },
            ],
            name: FitApiDataSourceService.DATA_TYPE_WEIGHT,
        }, FitApiDataSourceService.WEIGHT_NAME));
    }

    public createBodyFatPercentageDatasource(): Observable<HttpEvent<any>> {
        return this.createDataSource(this.createDataSourceMetaData({
            field: [
                {
                    name: 'percentage',
                    format: 'floatPoint',
                },
            ],
            name: FitApiDataSourceService.DATA_TYPE_BODY_FAT_PERCENTAGE,
        }, FitApiDataSourceService.BODY_FAT_PERCENTAGE_NAME));
    }

    public createDataSource(datasource: CreateDataSourceRequest): Observable<HttpEvent<any>> {
        return this.fitApiBaseService.postRequest(FitApiBaseService.ENDPOINT + '/users/me/dataSources', datasource);
    }

    public getOrCreateBodyFatPercentageDataSource(): Observable<HttpEvent<FitDataSource>> {
        return this.getDataSources(FitApiDataSourceService.DATA_TYPE_BODY_FAT_PERCENTAGE)
            .pipe(flatMap((event: HttpEvent<FitDataSourceList>): Observable<HttpEvent<FitDataSource>> => {
                if (event.type === HttpEventType.Response) {
                    for (const source of event.body.dataSource) {
                        if (source.dataStreamName === FitApiDataSourceService.BODY_FAT_PERCENTAGE_NAME && source.device.uid === navigator.userAgent.replace(/[^\w]/gi, '')) {
                            const modified: HttpResponse<FitDataSource> = event.clone({
                                body: source,
                            });
                            return of(modified);
                        }
                    }
                    return this.createBodyFatPercentageDatasource()
                        .pipe(filter((ev: HttpEvent<any>): boolean =>
                            ev.type >= HttpEventType.Response));
                } else {
                    return of(event);
                }
            }));
    }

    public getOrCreateWeightDataSource(): Observable<HttpEvent<FitDataSource>> {
        return this.getDataSources(FitApiDataSourceService.DATA_TYPE_WEIGHT)
            .pipe(flatMap((event: HttpEvent<FitDataSourceList>): Observable<HttpEvent<FitDataSource>> => {
                if (event.type === HttpEventType.Response) {
                    for (const source of event.body.dataSource) {
                        if (source.dataStreamName === FitApiDataSourceService.WEIGHT_NAME && source.device.uid === navigator.userAgent.replace(/[^\w]/gi, '')) {
                            const modified: HttpResponse<FitDataSource> = event.clone({
                                body: source,
                            });
                            return of(modified);
                        }
                    }
                    return this.createWeightDatasource()
                        .pipe(filter((ev: HttpEvent<any>): boolean =>
                            ev.type >= HttpEventType.Response));
                } else {
                    return of(event);
                }
            }));
    }
    public getOrCreateWeightDataSource2(): Observable<FitDataSource> {
        const req1: HttpRequest<any> = this.fitApiBaseService.createGetRequest(FitApiBaseService.ENDPOINT + '/users/me/dataSources');
        const req2: HttpRequest<any> = this.fitApiBaseService.createGetRequest(FitApiBaseService.ENDPOINT + '/users/me/dataSources');
        return this.fitApiBaseService
            .executeBatchRequest({
                res1: req1,
                res2: req2,
            }) as any;
    }

    public getOrCreateDataSource(dataType: DataTypes, streamName: string) {
        return null;
    }
}
export enum DataTypes {
    WEIGHT = 'com.google.weight',
    BODY_FAT_PERCENTAGE = 'com.google.body.fat.percentage',
}
export interface FitDataSourceList {
    dataSource: FitDataSource[];
}

export interface FitDataSource {
    application: {
        version: string,
        detailsUrl: string,
        name: string,
    };
    dataQualityStandard: [];
    dataStreamId: string;
    dataStreamName: string;
    dataType: {
        name: string,
        field: {
            name: string;
            format: 'blob' | 'floatList' | 'floatPoint' | 'integer' | 'integerList' | 'map' | 'string';
            optional?: boolean;
        }[],
    };
    device: {
        uid: string,
        type: 'chestStrap' | 'headMounted' | 'phone' | 'scale' | 'tablet' | 'unknown' | 'watch',
        version: string,
        model: string,
        manufacturer: string,
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
