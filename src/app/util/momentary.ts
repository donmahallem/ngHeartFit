/*!
 * Source https://github.com/donmahallem/ngHeartFit
 */

import { IFitSession } from '@donmahallem/google-fit-api-types';
import * as moment from 'moment';

type TimeMillisKeys = 'startTimeMillis' | 'endTimeMillis' | 'modifiedTimeMillis';
export type IMomentFit<T extends IFitSession> = Omit<T, TimeMillisKeys> & { [P in keyof Pick<T, TimeMillisKeys>]: moment.Moment; };

export class Momentary {
    public static convert<T extends IFitSession>(input: T): IMomentFit<T> {
        const convObj: IMomentFit<T> = Object.assign({}, input) as any;
        for (const key of Object.keys(input)) {
            if (key.endsWith('Millis')) {
                convObj[key] = moment(input[key], 'x');
            }
        }
        return convObj;
    }
}
