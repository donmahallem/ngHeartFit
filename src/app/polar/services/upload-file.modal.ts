/*!
 * Source https://github.com/donmahallem/ngHeartFit
 */

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
export interface IUploadFile {
    key: string;
    filename: string;
    status: UploadFileStatus;
}

export interface IUploadFileError extends IUploadFile {
    status: UploadFileStatus.ERROR;
    error: ValidationError | Error;
}

export interface IUploadFileResult<T, K extends UploadFileType> extends IUploadFile {
    data: T;
    selected?: boolean;
    status: UploadFileStatus.LOADED;
    filesize: number;
    type: K;
}

export interface IUploadFileProgress extends IUploadFile {
    currentBytes?: number;
    totalBytes?: number;
    lengthComputable: boolean;
    status: UploadFileStatus.LOADING;
}
export interface IUploadFileInitializing extends IUploadFile {
    status: UploadFileStatus.INITIALIZING;
}

export interface IUploadFileSleepResult extends IUploadFileResult<INightSleep, UploadFileType.SLEEP_DATA> {

}
export interface IUploadFileDaySummaryResult extends IUploadFileResult<IDaySummary, UploadFileType.DAY_SUMMARY> {

}

export type UploadFileResults = IUploadFileDaySummaryResult | IUploadFileSleepResult;
export type UploadFiles = IUploadFileInitializing | IUploadFileProgress | IUploadFileError | UploadFileResults;

export interface ITypedFile<T, K extends UploadFileType> {
    type: K;
    data: T;
}

export interface ISleepDataFile extends ITypedFile<INightSleep, UploadFileType.SLEEP_DATA> {
}

export interface IDaySummaryFile extends ITypedFile<IDaySummary, UploadFileType.DAY_SUMMARY> {
}

export type TypedFiles = IDaySummaryFile | ISleepDataFile;
