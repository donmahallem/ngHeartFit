import { ValidationError } from 'jsonschema';
export enum UploadFileType {
    UNKNOWN = 1,
    DAY_SUMMARY = 2,
    SLEEP_DATA = 3
}
export interface UploadFile {
    valid: boolean;
    data: any;
    filename: string;
    selected?: boolean;
    errors?: null | ValidationError[] | Error[];
    type: UploadFileType;
}
