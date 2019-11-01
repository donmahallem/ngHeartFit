/*!
 * Source https://github.com/donmahallem/ngHeartFit
 */

import {
    AfterContentInit,
    Component,
    ElementRef,
    Input,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ISleepReport, ISleepWakeState, SleepWakeStateType } from '@donmahallem/flow-api-types';
import { ActivityTypes, IFitSession } from '@donmahallem/google-fit-api-types';
import * as d3 from 'd3';
import * as moment from 'moment';
import { from, throwError } from 'rxjs';
import { catchError, filter, flatMap } from 'rxjs/operators';
import { FitApiDataSourceService } from 'src/app/service/fit-data-source.service';
import { FileLoadEventType, FileUtil, IFileLoadResultEvent } from 'src/app/util';
import { SleepService } from './sleep.service';

@Component({
    providers: [
        SleepService,
    ],
    selector: 'app-sleep-day',
    styleUrls: ['./sleep-day.component.scss'],
    templateUrl: './sleep-day.component.pug',
})
export class SleepDayComponent implements OnInit, OnDestroy, AfterContentInit {
    private mSleepData: ISleepReport[] = [];
    @Input()
    public set sleeps(data: ISleepReport[]) {
        if (data === undefined) {
            return;
        }
        this.mSleepData = data;
        const minTime: Date = data.map((value: ISleepReport): Date =>
            new Date(value.sleepStartTime))
            .sort((a: Date, b: Date): number => {
                const aMinutes: number = a.getMinutes() +
                    (((a.getHours() < 12 ? 24 : 0) + a.getHours()) * 60);
                const bMinutes: number = b.getMinutes() +
                    (((b.getHours() < 12 ? 24 : 0) + b.getHours()) * 60);
                return aMinutes - bMinutes;
            })[0];
        const maxTime: Date = data.map((value: ISleepReport): Date =>
            new Date(value.sleepEndTime))
            .sort((a: Date, b: Date): number => {
                const aMinutes: number = a.getMinutes() +
                    (((a.getHours() < 12 ? 24 : 0) + a.getHours()) * 60);
                const bMinutes: number = b.getMinutes() +
                    (((b.getHours() < 12 ? 24 : 0) + b.getHours()) * 60);
                return bMinutes - aMinutes;
            })[0];
        // tslint:disable-next-line:no-console
        console.log(minTime, maxTime);
    }
    public get sleeps(): ISleepReport[] {
        return this.mSleepData;
    }
    constructor(private el: ElementRef,
        private fitDataSourceService: FitApiDataSourceService) {
    }
    public aaa(dataSourceId: string, sleepReport: ISleepReport): any {
        const data = {
            dataSourceId,
            maxEndTimeNs: moment(sleepReport.sleepEndTime) + '000000',
            minStartTimeNs: moment(sleepReport.sleepStartTime) + '000000',
            point: sleepReport.sleepWakeStates.map((val: ISleepWakeState, idx: number, sleeps: ISleepWakeState[]) => {
                const startTime: moment.Moment = moment(sleepReport.sleepStartTime).add(val.offsetFromStart, 's');
                const endTime: moment.Moment = (idx < sleeps.length - 1) ?
                    moment(sleepReport.sleepStartTime).add(sleeps[idx + 1].offsetFromStart, 's') :
                    moment(sleepReport.sleepEndTime);
                let sleepLevel: number = ActivityTypes.Sleeping;
                switch (val.sleepWakeState) {
                    case SleepWakeStateType.DEEP_SLEEP:
                        sleepLevel = ActivityTypes.Deep_Sleep;
                        break;
                    case SleepWakeStateType.REM:
                        sleepLevel = ActivityTypes.REM_Sleep;
                        break;
                    case SleepWakeStateType.LIGHT_SLEEP:
                        sleepLevel = ActivityTypes.Light_Sleep;
                        break;
                    case SleepWakeStateType.INTERUPTIONS:
                        sleepLevel = ActivityTypes.Awake;
                        break;
                }
                return {
                    dataTypeName: 'com.google.activity.segment',
                    endTimeNanos: endTime.valueOf() + '000000',
                    startTimeNanos: startTime.valueOf() + '000000',
                    value: [
                        {
                            intVal: sleepLevel,
                        },
                    ],
                };
            }),
        };
        return data;
    }

    public uploadToFit(): void {
        this.fitDataSourceService.createSleepActivityDatasource()
            .pipe(catchError((err) => {
                if (err.status === 409) {
                    return from(this.mSleepData)
                        .pipe(flatMap((sleepReport) => {
                            const dSourceId = 'raw:com.google.activity.segment:265564637760:Mozilla:Netscape:Mozilla50WindowsNT100Win64x64AppleWebKit53736KHTMLlikeGeckoChrome7703865120Safari53736:sleepdata.from.polar';
                            const data = this.aaa(dSourceId, sleepReport);
                            return this.fitDataSourceService
                                .submitUserSleep(dSourceId,
                                    moment(sleepReport.sleepStartTime),
                                    moment(sleepReport.sleepEndTime),
                                    data);
                        }));
                }
                return throwError(err);
            }))
            .subscribe(console.log, console.error);
    }
    public convertSleepReport(sleepReport: ISleepReport): IFitSession {
        return {
            activityType: ActivityTypes.Sleeping,
            application: {
                detailsUrl: 'http://example.com',
                name: 'Foo Example App',
                version: '1.0',
            },
            description: 'sleep date',
            endTimeMillis: moment(sleepReport.sleepEndTime).valueOf(),
            id: 'sleep_' + sleepReport.date,
            lastModifiedToken: 'exampleToken',
            name: 'Sleep ' + sleepReport.date,
            startTimeMillis: moment(sleepReport.sleepStartTime).valueOf(),
            version: 1,
        }
    }
    public uploadSessions(): void {
        const datas: IFitSession[] = this.mSleepData
            .map((val: ISleepReport): IFitSession => this.convertSleepReport(val));
        from(datas)
            .pipe(flatMap((val) => {
                const dSourceId = 'raw:com.google.activity.segment:265564637760:Mozilla:Netscape:Mozilla50WindowsNT100Win64x64AppleWebKit53736KHTMLlikeGeckoChrome7703865120Safari53736:sleepdata.from.polar';

                return this.fitDataSourceService
                    .submitUserSleepSession(dSourceId, val);
            }))
            // tslint:disable-next-line:no-console
            .subscribe(console.log, console.error);

    }
    public getSessionData(): void {

        const dSourceId = 'raw:com.google.activity.segment:265564637760:Mozilla:Netscape:Mozilla50WindowsNT100Win64x64AppleWebKit53736KHTMLlikeGeckoChrome7703865120Safari53736:sleepdata.from.polar';

        this.fitDataSourceService.getSessionData(dSourceId, moment().subtract(1, 'month'), moment().add(1, 'week'))
            .subscribe(console.log, console.error);
    }
    public getDatasets(): void {
        this.fitDataSourceService.getSessions(moment().subtract(1, 'month'), moment().add(1, 'week'))
            .subscribe(console.log, console.error);
    }
    public ngOnInit(): void {
    }

    public ngOnDestroy(): void {
    }
    public ngAfterContentInit(): void {
        d3.select(this.el.nativeElement)
            .append('svg')
            .selectAll('circle')
            .data([1000, 10000, 250000, 15000])
            .enter()
            .append('circle')
            .attr('r', (d) => Math.log(d))
            .attr('fill', '#5fc')
            .attr('stroke', '#333')
            .attr('transform', (d, i) => {
                const offset = i * 20 + 2 * Math.log(d);
                return offset;
            });
    }
    public onFileUpload(files: FileList): void {
        FileUtil.readFileAsJson(files.item(0), 'any')
            .pipe(filter((val) =>
                val.type === FileLoadEventType.RESULT))
            .subscribe((data: IFileLoadResultEvent<any>) => {
                console.log(data);
                this.sleeps = data.result;
            });
        console.log(files);
    }
}
