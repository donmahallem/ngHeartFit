import { ValidationError } from "jsonschema";

export interface UploadFile {
    key: string;
    valid: boolean;
    data: any;
    filename: string;
    selected?: boolean;
    errors?: null | ValidationError[] | Error[];
}
