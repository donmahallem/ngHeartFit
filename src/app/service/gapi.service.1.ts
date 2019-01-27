import { Injectable, NgZone } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { timer, Observable, Subscription, of, combineLatest, BehaviorSubject } from "rxjs";
import { catchError, map, tap, mergeMapTo, filter, mergeMap } from 'rxjs/operators';
import * as moment from 'moment';
/*
@Injectable({
    providedIn: 'root',
})
export class GapiService {


    private signinStatusSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
    private clientStatusSubject: BehaviorSubject<ClientStatus> = new BehaviorSubject(ClientStatus.LOADING);
    constructor(private _ngZone: NgZone) {

        this.loadClient().then(
            result => {
                console.log("Api loaded");

                return this.initAuthClient()
            },
            err => {
                console.error(err);
                this.clientStatusSubject.next(ClientStatus.ERROR);
            }
        ).then((result: void) => {
            console.log("initialized");
            gapi.auth2.getAuthInstance().isSignedIn.listen((status: boolean) => {
                this.signinStatusSubject.next(status);
            });
            if (gapi.auth2.getAuthInstance().currentUser.get() != null) {
                this.signinStatusSubject.next(true);
            }
            this.clientStatusSubject.next(ClientStatus.LOADED);
        }, err => {
            console.log(err);
            this.clientStatusSubject.next(ClientStatus.ERROR);
        })
    }


    public awaitClientObservable(): Observable<ClientStatus> {
        return this.clientStatusSubject
            .pipe(filter((status: ClientStatus) => {
                return status == ClientStatus.LOADED;
            }));
    }
    loadClient(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._ngZone.run(() => {
                gapi.load('client', {
                    callback: resolve,
                    onerror: reject,
                    timeout: 1000, // 5 seconds.
                    ontimeout: reject
                });
            });
        });
    }
    initClientPromise(): Promise<any> {
        var API_KEY = ""// Your API key.
        var DISCOVERY_DOC = "" // Your discovery doc URL.
        var initObj: gapi.auth2.ClientConfig = {
            "client_id": environment.gapi.client_id,
            "redirect_uri": environment.gapi.redirect_uri,
            "scope": "https://www.googleapis.com/auth/fitness.body.read https://www.googleapis.com/auth/fitness.body.write"
        };

        return new Promise((resolve, reject) => {
            this._ngZone.run(() => {
                gapi.client.init(initObj).then(resolve, reject);
            });
        });
    }
    initAuthClient(): Promise<any> {
        var API_KEY = ""// Your API key.
        var DISCOVERY_DOC = "" // Your discovery doc URL.
        var initObj: gapi.auth2.ClientConfig = {
            "client_id": environment.gapi.client_id,
            "scope": "https://www.googleapis.com/auth/fitness.body.read https://www.googleapis.com/auth/fitness.body.write https://www.googleapis.com/auth/fitness.nutrition.read https://www.googleapis.com/auth/fitness.nutrition.write"
        };

        return new Promise((resolve, reject) => {
            this._ngZone.run(() => {
                gapi.auth2.init(initObj).then(resolve, reject);
            });
        });
    }

    public getCurrentUser(): gapi.auth2.GoogleUser {
        return gapi.auth2.getAuthInstance().currentUser.get();
    }

    public getSigninStatus(): Observable<boolean> {
        return this.signinStatusSubject.asObservable();
    }

    public getDataSources(): Observable<any> {
        return this.awaitClientObservable()
            .pipe(mergeMap((status: ClientStatus): any => {
                return gapi.client.request({ path: "/fitness/v1/users/me/dataSources" });
            }));
    }

    public signIn(): Observable<gapi.auth2.GoogleUser> {
        return this.awaitClientObservable()
            .pipe(mergeMap((status: ClientStatus) => {
                return gapi.auth2.getAuthInstance().signIn({
                    scope: 'https://www.googleapis.com/auth/fitness.body.read https://www.googleapis.com/auth/fitness.body.write https://www.googleapis.com/auth/fitness.nutrition.read https://www.googleapis.com/auth/fitness.nutrition.write'
                });
            }));
    }

    public createDatasource(): Observable<any> {
        const dataSource: any = {
            "dataStreamName": "MyDataSource",
            "type": "raw",
            "application": {
                "detailsUrl": "http://example.com",
                "name": "Foo Example App",
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
                "manufacturer": "Example Manufacturer",
                "model": "ExampleTablet",
                "type": "scale",
                "uid": "1000001",
                "version": "1.0"
            }
        };
        return this.awaitClientObservable()
            .pipe(mergeMap((status: ClientStatus) => {
                return gapi.client.request({
                    path: "/fitness/v1/users/me/dataSources",
                    method: "post",
                    body: dataSource
                });
            }));
    }
    public createNutritionDatasource(): Observable<any> {

        const dataSource: any = {
            "dataStreamName": "NutritionSource",
            "type": "raw",
            "application": {
                "detailsUrl": "http://example.com",
                "name": "My Example App",
                "version": "1"
            },
            "dataType": {
                "name": "com.google.nutrition",
                "field": [
                    {
                        "name": "nutrients",
                        "format": "map"
                    },
                    {
                        "name": "meal_type",
                        "format": "integer",
                        "optional": true
                    },
                    {
                        "name": "food_item",
                        "format": "string",
                        "optional": true
                    }
                ]
            },
            "device": {
                "manufacturer": "Example Manufacturer",
                "model": "ExampleTablet",
                "type": "scale",
                "uid": "1000001",
                "version": "1.0"
            }
        };
        return this.awaitClientObservable()
            .pipe(mergeMap((status: ClientStatus) => {
                return gapi.client.request({
                    path: "/fitness/v1/users/me/dataSources",
                    method: "post",
                    body: dataSource
                });
            }));
    }

    public getCurrentTimeInNanos(): string {
        return moment.utc().unix() + "000000000";
    }
    public storeNutrition(): Observable<any> {
        const dataSourceId: string = "raw:com.google.nutrition:265564637760:Example Manufacturer:ExampleTablet:1000001:NutritionSource";
        const nanoTimestamp2: string = this.getCurrentTimeInNanos();
        const nanoTimestamp: number = moment.utc().unix() * 1000000000;
        const data: any = {
            "minStartTimeNs": nanoTimestamp,
            "maxEndTimeNs": nanoTimestamp,
            "dataSourceId": dataSourceId,
            "point": [
                {
                    "startTimeNanos": nanoTimestamp,
                    "endTimeNanos": nanoTimestamp,
                    "dataTypeName": "com.google.nutrition",
                    "value": [
                        {
                            "mapVal": [
                                {
                                    "key": "fat.total",
                                    "value": {
                                        "fpVal": 0.4
                                    }
                                },
                                {
                                    "key": "sodium",
                                    "value": {
                                        "fpVal": 1.0
                                    }
                                },
                                {
                                    "key": "fat.saturated",
                                    "value": {
                                        "fpVal": 0.1
                                    }
                                },
                                {
                                    "key": "protein",
                                    "value": {
                                        "fpVal": 1.3
                                    }
                                },
                                {
                                    "key": "carbs.total",
                                    "value": {
                                        "fpVal": 27.0
                                    }
                                },
                                {
                                    "key": "cholesterol",
                                    "value": {
                                        "fpVal": 0.0
                                    }
                                },
                                {
                                    "key": "calories",
                                    "value": {
                                        "fpVal": 105.0
                                    }
                                },
                                {
                                    "key": "sugar",
                                    "value": {
                                        "fpVal": 14.0
                                    }
                                },
                                {
                                    "key": "dietary_fiber",
                                    "value": {
                                        "fpVal": 3.1
                                    }
                                },
                                {
                                    "key": "potassium",
                                    "value": {
                                        "fpVal": 422.0
                                    }
                                }
                            ]
                        },
                        {
                            "intVal": 4
                        },
                        {
                            "strVal": "banana"
                        }
                    ]
                }
            ]
        };
        return this.awaitClientObservable()
            .pipe(mergeMap((status: ClientStatus) => {
                return gapi.client.request({
                    path: "/fitness/v1/users/me/dataSources/" + dataSourceId + "/datasets/" + nanoTimestamp + "-" + nanoTimestamp,
                    method: "PATCH",
                    body: data
                });
            }));
    }

    public storeWeight(): Observable<any> {
        1541358958000
        1397515179728708316
        1541359065000000
        1541359017000000
        const dataSourceId: string = "raw:com.google.weight:265564637760:Example Manufacturer:ExampleTablet:1000001:MyDataSource";
        const nanoTimestamp2: string = this.getCurrentTimeInNanos();
        const nanoTimestamp: number = moment.utc().unix() * 1000000000;
        const data: any = {
            "minStartTimeNs": nanoTimestamp,
            "maxEndTimeNs": nanoTimestamp,
            "dataSourceId": dataSourceId,
            "point": [
                {
                    "dataTypeName": "com.google.weight",
                    "originDataSourceId": "",
                    "startTimeNanos": nanoTimestamp,
                    "endTimeNanos": nanoTimestamp,
                    "value": [
                        {
                            "fpVal": 70 + (Math.random() * 20)
                        }
                    ]
                }
            ]
        };
        return this.awaitClientObservable()
            .pipe(mergeMap((status: ClientStatus) => {
                return gapi.client.request({
                    path: "/fitness/v1/users/me/dataSources/" + dataSourceId + "/datasets/" + nanoTimestamp + "-" + nanoTimestamp,
                    method: "PATCH",
                    body: data
                });
            }));
    }
    public getWeights(from: number, to: number): Observable<any> {
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
    }

    public getAggregateWeights(daysAgo: number = 0): Observable<fitness_v1.Schema$AggregateResponse> {

        const dataSourceId: string = "raw:com.google.weight:265564637760:Example Manufacturer:ExampleTablet:1000001:MyDataSource";
        var start: moment.Moment = moment.utc().subtract(31, "days");
        var end: moment.Moment = moment.utc();
        console.log(start, end);
        var request = {
            "aggregateBy": [{
                "dataTypeName": "com.google.weight.summary",
                "dataSourceId": "derived:com.google.weight:com.google.android.gms:merge_weight"
            }],
            "bucketByTime": { "durationMillis": 24 * 3600 * 1000 },
            "startTimeMillis": start.valueOf(),
            "endTimeMillis": end.valueOf()
        };
        return this.awaitClientObservable()
            .pipe(mergeMap((status: ClientStatus) => {
                return gapi.client.request({
                    path: "/fitness/v1/users/me/dataset:aggregate",
                    method: "POST",
                    body: request
                });
            }), map((res: any) => {
                return res.result;
            }));
    }
    //
}*/