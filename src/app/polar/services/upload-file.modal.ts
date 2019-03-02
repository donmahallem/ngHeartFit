import { ValidationError } from 'jsonschema';
import { INightSleep, IDayData, IDaySummary } from '@donmahallem/flow-api-types';
export enum UploadFileType {
    UNKNOWN = 1,
    DAY_SUMMARY = 2,
    SLEEP_DATA = 3
}
export interface UploadFile {
    valid: boolean;
    data: any;
    filename: string;
    filesize?: number;
    selected?: boolean;
    error?: null | ValidationError | Error;
    type: UploadFileType;
}

export interface TypedFile<T, K extends UploadFileType> {
    type: K;
    data: T;
}

export interface SleepDataFile extends TypedFile<INightSleep, UploadFileType.SLEEP_DATA> {
}

export interface DaySummaryFile extends TypedFile<IDaySummary, UploadFileType.DAY_SUMMARY> {
}

export type TypedFiles = DaySummaryFile | SleepDataFile;
