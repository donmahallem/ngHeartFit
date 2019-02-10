
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FitDatasource } from './fit-datasource.modal';
import { map, flatMap } from 'rxjs/operators';
import { DataPoint } from '../analyze/view-upload/data-point';
import { SubmitValue, SubmitToDatasetBody, SubmitToDatasetResponse } from './fit-api-modals';

@Injectable()
export class FitApiService {
    private readonly BASE_URL: string = 'https://www.googleapis.com/fitness/v1/';
    private readonly ENDPOINT_URL: string = '/users/@me/lists';
    private authHeader: HttpHeaders = new HttpHeaders();

    constructor(private httpService: HttpClient) {

    }

    public getAllDataSources(): Observable<FitDatasource> {
        return this.createHeader()
            .pipe(flatMap((headers: HttpHeaders): Observable<any> => {
                console.log('test header', headers);
                return this.httpService.get(this.BASE_URL + 'users/me/dataSources', { headers: headers });
            }));
    }

    public insertDataPoints(dataPoints: DataPoint[]): Observable<SubmitToDatasetResponse> {
        return this.createHeader()
            .pipe(flatMap((headers: HttpHeaders) => {
                const sourceId = 'raw:com.google.heart_rate.bpm:265564637760:Example Browser:Browser:1000001:PolarImport';
                let startTimeMillis: any = -1;
                let endTimeMillis: any = -1;
                const submitPoints: SubmitValue[] = [];
                for (const dpoint of dataPoints) {
                    if (startTimeMillis < 0 || startTimeMillis > dpoint.x.getTime()) {
                        startTimeMillis = dpoint.x.getTime();
                    }
                    if (endTimeMillis < 0 || endTimeMillis < dpoint.x.getTime()) {
                        endTimeMillis = dpoint.x.getTime();
                    }
                    if (dpoint.y) {
                        submitPoints.push(
                            {
                                'dataTypeName': 'com.google.heart_rate.bpm',
                                'endTimeNanos': dpoint.x.getTime() * 1000000,
                                'originDataSourceId': '',
                                'startTimeNanos': dpoint.x.getTime() * 1000000,
                                'value': [
                                    {
                                        'fpVal': dpoint.y
                                    }
                                ]
                            });
                    }
                }
                const requestBody: SubmitToDatasetBody = {
                    'dataSourceId': sourceId,
                    'maxEndTimeNs': (endTimeMillis * 1000000),
                    'minStartTimeNs': (startTimeMillis * 1000000),
                    'point': submitPoints
                };

                return this.httpService.patch(this.BASE_URL + 'users/me/dataSources/' + sourceId + '/datasets/' + (startTimeMillis * 1000000) + '-' + (endTimeMillis * 1000000), requestBody, { headers: headers });
            }), map((value: Object) => {
                return <SubmitToDatasetResponse>value;
            }));
    }

    public createDatasource(): Observable<any> {
        return this.createHeader()
            .pipe(flatMap((headers: HttpHeaders) => {
                const requestBody: any = {
                    'dataStreamName': 'PolarImport',
                    'type': 'raw',
                    'application': {
                        // "packageName": "com.github.donmahallem.heartfit",
                        'detailsUrl': 'https://donmahallem.github.io/ngHeartFit',
                        'name': 'HeartFit',
                        'version': '1'
                    },
                    'dataType': {
                        'field': [
                            {
                                'name': 'bpm',
                                'format': 'floatPoint'
                            }
                        ],
                        'name': 'com.google.heart_rate.bpm'
                    },
                    'device': {
                        'manufacturer': 'Example Browser',
                        'model': 'Browser',
                        'type': 'unknown',
                        'uid': '1000001',
                        'version': '1.0'
                    }
                };
                return this.httpService.post(this.BASE_URL + 'users/me/dataSources', requestBody, { headers: headers });
            }));
    }

    private createHeader(): Observable<HttpHeaders> {
        const header: HttpHeaders = new HttpHeaders()
            .set('Authorization', 'Bearer ');
        return of(header);
    }

    findAll(): Observable<TasklistListResponse> {
        return <any>this.httpService.get(this.ENDPOINT_URL, { headers: this.authHeader });
    }

    findById(id: string): Observable<Tasklist> {
        return this.httpService.get(this.ENDPOINT_URL + '/' + id, { headers: this.authHeader });
    }

    create(tasklist: Tasklist): Observable<Tasklist> {
        return this.httpService.post(this.ENDPOINT_URL, tasklist, { headers: this.authHeader });
    }

    update(tasklist: Tasklist): Observable<Tasklist> {
        return this.httpService.put(this.ENDPOINT_URL + '/' + tasklist.id, tasklist, { headers: this.authHeader });
    }

    delete(id: string): Observable<Object> {
        return this.httpService.delete(this.ENDPOINT_URL + '/' + id, { headers: this.authHeader });
    }
}
export interface TasklistListResponse {
    items: Tasklist[];
}

export interface Tasklist {
    id?: string;
}
