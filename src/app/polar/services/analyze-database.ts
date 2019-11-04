/*!
 * Source https://github.com/donmahallem/ngHeartFit
 */

import Dexie from 'dexie';

export interface IHeartRate {
    timestamp: number;
    bpm: number;
}

export class AnalyzeDatabase extends Dexie {
    heartrate: Dexie.Table<IHeartRate, number>;
    constructor() {
        super('analyze-database');
        this.version(1).stores({ heartrate: 'timestamp,bpm' });
    }
}
