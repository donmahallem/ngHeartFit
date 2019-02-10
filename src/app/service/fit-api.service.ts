
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { FitDatasource } from "./fit-datasource.modal";
import { map, flatMap, filter } from "rxjs/operators";
import { DataPoint } from "../analyze/view-upload/data-point";
import { SubmitValue, SubmitToDatasetBody, SubmitToDatasetResponse, BucketResponse, DataSourceListResponse, DataSourceInformation } from "./fit-api-modals";
import { ngGapiService, GapiStatus } from "./nggapi-base.service";
import { GapiUserService } from "./gapi-user.service";
import * as moment from "moment";

@Injectable()
export class FitApiService {
    public static readonly ENDPOINT: string = 'https://www.googleapis.com/fitness/v1';
    constructor(private httpService: HttpClient,
        private nggapi: ngGapiService,
        private gapiUser: GapiUserService) {

    }

    public base(): Observable<void> {
        return this.nggapi.statusObservable
            .pipe(filter((status) => {
                return status != GapiStatus.LOADING;
            }), map((status: GapiStatus) => {
                if (status === GapiStatus.FAILED)
                    throw new Error();
                return;
            }))
    }

    public getDataSource(id: string): Observable<DataSourceInformation> {
        return this.base()
            .pipe(flatMap((t: void) => {
                let url = FitApiService.ENDPOINT + '/users/me/dataSources/' + id;
                const headers: HttpHeaders = new HttpHeaders();
                return this.httpService.get<DataSourceInformation>(url, {
                    headers: {
                        'Authorization': 'Bearer ' + this.gapiUser.getToken()
                    }
                })
            }))
    }

    public getAllDataSources(): Observable<DataSourceListResponse> {
        return this.base()
            .pipe(flatMap((t: void) => {
                let url = FitApiService.ENDPOINT + '/users/me/dataSources';
                const headers: HttpHeaders = new HttpHeaders();
                return this.httpService.get<DataSourceListResponse>(url, {
                    headers: {
                        'Authorization': 'Bearer ' + this.gapiUser.getToken()
                    }
                })
            }))
    }
    public getDataPointsFromDataSource(dataSource: string, from: moment.Moment, to: moment.Moment): Observable<DataSourceListResponse> {
        return this.base()
            .pipe(flatMap((t: void) => {
                let url = FitApiService.ENDPOINT + '/users/me/dataSources/' + dataSource + '/datasets/' + from.valueOf() + '000000-' + to.valueOf() + '000000';
                const headers: HttpHeaders = new HttpHeaders();
                return this.httpService.get<DataSourceListResponse>(url, {
                    headers: {
                        'Authorization': 'Bearer ' + this.gapiUser.getToken()
                    }
                })
            }))
    }
    /*
        public getMergedWeights(): Observable<any> {derived:com.google.weight:com.google.android.gms:merge_weight
            return this.base()
                .pipe(flatMap(() => {
                    const dataSourceId: string = "raw:com.google.weight:265564637760:Example Manufacturer:ExampleTablet:1000001:MyDataSource";
                    const nanoTimestamp: string = moment.utc().subtract(7, "days").unix() + "000000000"; 1397515179728708316;
                    const nanoTimestamp2: string = moment.utc().unix() + "000000000";
                    return this.awaitClientObservable()
                        .pipe(mergeMap((status: ClientStatus) => {
                            return gapi.client.request({
                                path: "/fitness/v1/users/me/dataSources/" + dataSourceId + "/datasets/" + nanoTimestamp + "-" + nanoTimestamp2,
                                method: "get"
                            });
                        }));
                    let url = FitApiService.ENDPOINT + '/users/me/dataSources';
                    const headers: HttpHeaders = new HttpHeaders();
                    console.log(headers);
                    return this.httpService.get(url, {
                        headers: {
                            'Authorization': 'Bearer ' + this.gapiUser.getToken()
                        }
                    })
                }));
        }*/
    public getMergedWeights(): Observable<any> {
        return this.base()
            .pipe(flatMap(() => {
                const dataSourceId: string = "derived:com.google.weight:com.google.android.gms:merge_weight";
                const nanoTimestamp: string = moment.utc().subtract(100, "days").unix() + "000000000"; 1397515179728708316;
                const nanoTimestamp2: string = moment.utc().unix() + "000000000";
                let url = FitApiService.ENDPOINT + '/users/me/dataSources/' + dataSourceId + "/datasets/" + nanoTimestamp + "-" + nanoTimestamp2;
                const headers: HttpHeaders = new HttpHeaders();
                console.log(headers);
                return this.httpService.get(url, {
                    headers: {
                        'Authorization': 'Bearer ' + this.gapiUser.getToken()
                    }
                })
            }));
    }
    public createDatasource(a?: any): any {
        return null;
    }
    public createBodyFatDatasource(): Observable<any> {
        return this.base()
            .pipe(flatMap(() => {
                const requestBody: any = {
                    "dataStreamName": "PolarImport",
                    "type": "derived",
                    "application": {
                        "detailsUrl": "https://donmahallem.github.io/ngHeartFit",
                        "name": "HeartFit",
                        "version": "1"
                    },
                    "dataType": {
                        "field": [
                            {
                                "name": "percentage",
                                "format": "floatPoint"
                            }
                        ],
                        "name": "com.google.body.fat.percentage"
                    },
                    "device": {
                        "manufacturer": "Example Browser",
                        "model": "Browser",
                        "type": "unknown",
                        "uid": "1000002",
                        "version": "1.0"
                    }
                };
                let url = FitApiService.ENDPOINT + '/users/me/dataSources';
                return this.httpService.post(url, requestBody, {
                    headers: {
                        'Authorization': 'Bearer ' + this.gapiUser.getToken()
                    }
                });
            }))
    }
    public createWeightDatasource(): Observable<any> {
        return this.base()
            .pipe(flatMap(() => {
                const requestBody: any = {
                    "dataStreamName": "PolarImport",
                    "type": "raw",
                    "application": {
                        "detailsUrl": "https://donmahallem.github.io/ngHeartFit",
                        "name": "HeartFit",
                        "version": "1"
                    },
                    "dataType": {
                        "field": [
                            {
                                "name": "weight",
                                "format": "floatPoint"
                            }
                        ],
                        "name": "com.google.weight"
                    },
                    "device": {
                        "manufacturer": "Example Browser",
                        "model": "Browser",
                        "type": "unknown",
                        "uid": "1000001",
                        "version": "1.0"
                    }
                };
                let url = FitApiService.ENDPOINT + '/users/me/dataSources';
                return this.httpService.post(url, requestBody, {
                    headers: {
                        'Authorization': 'Bearer ' + this.gapiUser.getToken()
                    }
                });
            }))
    }
    public aggregateWeightAndHeight(): Observable<BucketResponse> {
        return this.base()
            .pipe(flatMap(() => {
                const requestBody: any = {
                    "startTimeMillis": moment().subtract(90, "day").valueOf(),
                    "endTimeMillis": moment.now(),
                    "aggregateBy": [
                        {
                            "dataTypeName": 'com.google.weight'
                        }, {
                            "dataTypeName": 'com.google.body.fat.percentage',
                            'dataSourceId': "derived:com.google.body.fat.percentage:265564637760:Example Browser:Browser:1000002:PolarImport"
                        }
                    ],
                    "bucketByTime": {
                        "durationMillis": 1000 * 60 * 60 * 12,
                        /*'"period": {
                            type: "day"
                        }*/
                    },
                };
                let url = FitApiService.ENDPOINT + '/users/me/dataset:aggregate';
                return this.httpService.post<BucketResponse>(url, requestBody, {
                    headers: {
                        'Authorization': 'Bearer ' + this.gapiUser.getToken()
                    }
                });
            }))
    }

    public insertDataPoints(a?: any[]) {
        return null;
    }
    public insertWeightDataPoints(sourceId: string, dataPoints: { weight: number, timestamp: moment.Moment }[]): Observable<SubmitToDatasetResponse> {
        return this.base()
            .pipe(flatMap(() => {
                let startTimeMillis: any = -1;
                let endTimeMillis: any = -1;
                let submitPoints: SubmitValue[] = [];
                for (let dpoint of dataPoints) {
                    if (startTimeMillis < 0 || startTimeMillis > dpoint.timestamp.valueOf()) {
                        startTimeMillis = dpoint.timestamp.valueOf();
                    }
                    if (endTimeMillis < 0 || endTimeMillis < dpoint.timestamp.valueOf()) {
                        endTimeMillis = dpoint.timestamp.valueOf();
                    }
                    if (dpoint.weight)
                        submitPoints.push(
                            {
                                "dataTypeName": "com.google.weight",
                                "endTimeNanos": dpoint.timestamp.valueOf() * 1000000,
                                "originDataSourceId": sourceId,
                                "startTimeNanos": dpoint.timestamp.valueOf() * 1000000,
                                "value": [
                                    {
                                        "fpVal": dpoint.weight
                                    }
                                ]
                            })
                }
                const requestBody: SubmitToDatasetBody = {
                    "dataSourceId": sourceId,
                    "maxEndTimeNs": endTimeMillis * 1000000,
                    "minStartTimeNs": startTimeMillis * 1000000,
                    "point": submitPoints
                };

                return this.httpService.patch(FitApiService.ENDPOINT + "/users/me/dataSources/" + sourceId + "/datasets/" + requestBody.minStartTimeNs + '-' + requestBody.maxEndTimeNs, requestBody, {
                    headers: {
                        'Authorization': 'Bearer ' + this.gapiUser.getToken()
                    }
                });
            }), map((value: Object) => {
                return <SubmitToDatasetResponse>value;
            }));
    }
    public insertFatDataPoints(sourceId: string, dataPoints: { fat: number, timestamp: moment.Moment }[]): Observable<SubmitToDatasetResponse> {
        return this.base()
            .pipe(flatMap(() => {
                let startTimeMillis: any = -1;
                let endTimeMillis: any = -1;
                let submitPoints: SubmitValue[] = [];
                for (let dpoint of dataPoints) {
                    if (startTimeMillis < 0 || startTimeMillis > dpoint.timestamp.valueOf()) {
                        startTimeMillis = dpoint.timestamp.valueOf();
                    }
                    if (endTimeMillis < 0 || endTimeMillis < dpoint.timestamp.valueOf()) {
                        endTimeMillis = dpoint.timestamp.valueOf();
                    }
                    if (dpoint.fat)
                        submitPoints.push(
                            {
                                "dataTypeName": "com.google.body.fat.percentage",
                                "endTimeNanos": dpoint.timestamp.valueOf() * 1000000,
                                "originDataSourceId": sourceId,
                                "startTimeNanos": dpoint.timestamp.valueOf() * 1000000,
                                "value": [
                                    {
                                        "fpVal": dpoint.fat
                                    }
                                ]
                            })
                }
                const requestBody: SubmitToDatasetBody = {
                    "dataSourceId": sourceId,
                    "maxEndTimeNs": endTimeMillis * 1000000,
                    "minStartTimeNs": startTimeMillis * 1000000,
                    "point": submitPoints
                };

                return this.httpService.patch(FitApiService.ENDPOINT + "/users/me/dataSources/" + sourceId + "/datasets/" + requestBody.minStartTimeNs + '-' + requestBody.maxEndTimeNs, requestBody, {
                    headers: {
                        'Authorization': 'Bearer ' + this.gapiUser.getToken()
                    }
                });
            }), map((value: Object) => {
                return <SubmitToDatasetResponse>value;
            }));
    }

    /*
        private createHeader(): Observable<HttpHeaders> {
            const header: HttpHeaders = new HttpHeaders()
                .set('Authorization', 'Bearer ');
            return of(header);
        }
    
        findAll(): Observable<TasklistListResponse> {
            return <any>this.httpService.get(this.ENDPOINT_URL, { headers: this.authHeader });
        }
    
        findById(id: string): Observable<Tasklist> {
            return this.httpService.get(this.ENDPOINT_URL + "/" + id, { headers: this.authHeader })
        }
    
        create(tasklist: Tasklist): Observable<Tasklist> {
            return this.httpService.post(this.ENDPOINT_URL, tasklist, { headers: this.authHeader })
        }
    
        update(tasklist: Tasklist): Observable<Tasklist> {
            return this.httpService.put(this.ENDPOINT_URL + "/" + tasklist.id, tasklist, { headers: this.authHeader })
        }
    
        delete(id: string): Observable<Object> {
            return this.httpService.delete(this.ENDPOINT_URL + "/" + id, { headers: this.authHeader })
        }*/
}
export interface TasklistListResponse {
    items: Tasklist[];
}

export interface Tasklist {
    id?: string;
}