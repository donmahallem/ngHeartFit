
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
export interface BucketResponse {
    bucket: Bucket[]
}
export interface Bucket {
    endTimeMillis: string,
    startTimeMillis: string,
    dataset: Dataset[]
}

export interface Dataset {
    point: DatasetPoint[],
    dataSourceId: string
}

export interface DatasetPoint {
    dataTypeName: "com.google.weight.summary" | string
    endTimeNanos: string,
    originDataSourceId: string,
    startTimeNanos: string,
    value: {
        fpVal: number, mapVal: any[]
    }[]
}

export interface DataSourceListResponse {
    dataSource: DataSourceInformation[];
}

export interface DataSourceInformation {
    application: {
        version: string,
        detailsUrl: string,
        name: string
    },
    dataQualityStandard: [],
    dataStreamId: string,
    dataStreamName: string,
    dataType: {
        name: string,
        field: {
            name: string,
            format: "blob" | "floatList" | "floatPoint" | "integer" | "integerList" | "map" | "string"
        }[]
    },
    device: {
        uid: string,
        type: "chestStrap" | "headMounted" | "phone" | "scale" | "tablet" | "unknown" | "watch",
        version: string,
        model: string,
        manufacturer: string
    },
    type: "derived" | "raw"
}