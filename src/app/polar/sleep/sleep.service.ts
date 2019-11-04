/*!
 * Source https://github.com/donmahallem/ngHeartFit
 */

import { Injectable } from '@angular/core';
import { ISleepReport } from '@donmahallem/flow-api-types';

@Injectable()
export class SleepService {
    private data: { [key: string]: ISleepReport } = {};

    public add(sleep: ISleepReport): void {
        this.data[sleep.date] = sleep;
    }
    public addAll(sleeps: ISleepReport[]): void {
        for (const report of sleeps) {
            this.data[report.date] = report;
        }
    }
    public clear(): void {
        this.data = {};
    }
}
