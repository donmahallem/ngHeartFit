import { Injectable } from '@angular/core';
import { IActivityGraphData } from '@donmahallem/flow-api-types';
import { from, Observable } from 'rxjs';
import { AnalyzeDatabase } from './analyze-database';

export interface Pair {
    timestamp: number;
    bpm: number;
}

@Injectable()
export class AnalyzeDataService {
    private database: AnalyzeDatabase;
    constructor() {
        this.database = new AnalyzeDatabase();
    }

    public insertActivityGraphData(data: IActivityGraphData): Observable<number> {
        const lst: Pair[] = [];
        for (const pair of data.heartRateTimelineSamples) {
            if (pair.value < 1) {
                continue;
            }
            lst.push({
                timestamp: pair.time,
                bpm: pair.value,
            });
        }
        return from(this.database.heartrate.bulkAdd(lst));
    }

    public getHeartRate(): Observable<Pair[]> {
        return from(this.database.heartrate.toArray());
    }

    /**
     * Clears all entries from the database
     */
    public clear(): Observable<void> {
        return from(this.database.heartrate.clear());
    }

}
