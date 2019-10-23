import { IDaySummary, INightSleep } from '@donmahallem/flow-api-types';
import { ValidationError } from 'jsonschema';
export enum UploadFileType {
    UNKNOWN = 1,
    DAY_SUMMARY = 2,
    SLEEP_DATA = 3,
}

export enum UploadFileStatus {
    INITIALIZING = 1,
    LOADING = 2,
    LOADED = 3,
    ERROR = 4,
}
export interface UploadFile {
    key: string;
    filename: string;
    status: UploadFileStatus;
}

export interface UploadFileError extends UploadFile {
    status: UploadFileStatus.ERROR;
    error: ValidationError | Error;
}

export interface UploadFileResult<T, K extends UploadFileType> extends UploadFile {
    data: T;
    selected?: boolean;
    status: UploadFileStatus.LOADED;
    filesize: number;
    type: K;
}

export interface UploadFileProgress extends UploadFile {
    currentBytes?: number;
    totalBytes?: number;
    lengthComputable: boolean;
    status: UploadFileStatus.LOADING;
}
export interface UploadFileInitializing extends UploadFile {
    status: UploadFileStatus.INITIALIZING;
}

export interface UploadFileSleepResult extends UploadFileResult<INightSleep, UploadFileType.SLEEP_DATA> {

}
export interface UploadFileDaySummaryResult extends UploadFileResult<IDaySummary, UploadFileType.DAY_SUMMARY> {

}

export type UploadFileResults = UploadFileDaySummaryResult | UploadFileSleepResult;
export type UploadFiles = UploadFileInitializing | UploadFileProgress | UploadFileError | UploadFileResults;

export interface TypedFile<T, K extends UploadFileType> {
    type: K;
    data: T;
}

export interface SleepDataFile extends TypedFile<INightSleep, UploadFileType.SLEEP_DATA> {
}

export interface DaySummaryFile extends TypedFile<IDaySummary, UploadFileType.DAY_SUMMARY> {
}

export type TypedFiles = DaySummaryFile | SleepDataFile;
