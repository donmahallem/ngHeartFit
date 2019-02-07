
export interface FpVal {
    fpVal: number
}

export interface IntVal {
    intVal: number;
}

export interface SubmitValue {
    dataTypeName: string;
    endTimeNanos: number;
    startTimeNanos: number;
    originDataSourceId: string;
    value: IntVal[] | FpVal[];
}

export interface SubmitToDatasetBody {
    dataSourceId: string;
    maxEndTimeNs: number | string;
    minStartTimeNs: number | string;
    point: SubmitValue[];
}
export interface SubmitToDatasetResponse {
    dataSourceId: string;
    maxEndTimeNs: string;
    minStartTimeNs: string;
    point: SubmitValue[];
}