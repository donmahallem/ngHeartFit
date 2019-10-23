/*!
 * Source https://github.com/donmahallem/ngHeartFit
 */

export interface IFpVal {
    fpVal: number;
}

export interface IIntVal {
    intVal: number;
}

export interface ISubmitValue {
    dataTypeName: string;
    endTimeNanos: number;
    startTimeNanos: number;
    originDataSourceId: string;
    value: IIntVal[] | IFpVal[];
}

export interface ISubmitToDatasetBody {
    dataSourceId: string;
    maxEndTimeNs: number | string;
    minStartTimeNs: number | string;
    point: ISubmitValue[];
}
export interface ISubmitToDatasetResponse {
    dataSourceId: string;
    maxEndTimeNs: string;
    minStartTimeNs: string;
    point: ISubmitValue[];
}
export interface IBucketResponse {
    bucket: IBucket[];
}
export interface IBucket {
    endTimeMillis: string;
    startTimeMillis: string;
    dataset: IDataset[];
}

export interface IDataset {
    point: IDatasetPoint[];
    dataSourceId: string;
}

export interface IDatasetPoint {
    dataTypeName: 'com.google.weight.summary' | string;
    endTimeNanos: string;
    originDataSourceId: string;
    startTimeNanos: string;
    value: {
        fpVal: number, mapVal: any[],
    }[];
}

export interface IFitSession {
    activityType: number;
    application: {
        packageName: string;
    };
    packageName: string;
    description: string;
    endTimeMillis: string;
    id: string;
    modifiedTimeMillis: string;
    name: string;
    startTimeMillis: string;
}

export interface IListSessionsResponse {
    session: IFitSession[];
    deletedSession?: IFitSession[];
    nextPageToken?: string;
    hasMoreData?: boolean;
}
