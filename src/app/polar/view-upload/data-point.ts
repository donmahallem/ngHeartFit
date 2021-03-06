/*!
 * Source https://github.com/donmahallem/ngHeartFit
 */

export interface IDataPoint {
    x: Date;
    y: number;
}

export class MinMaxDataPoint implements IDataPoint {

    private mY = 0;
    private mX: Date = new Date();
    private mDataPoints: IDataPoint[] = [];

    public get x(): Date {
        return this.mX;
    }

    public get y(): number {
        return this.mY;
    }

    public add(point: IDataPoint): void {
        this.mDataPoints.push(point);
        this.recalculate();
    }

    public recalculate(): void {
        this.mY = this.mDataPoints.map((val: IDataPoint, index: number, arr: IDataPoint[]): number =>
            val.y).reduce((prev: number, cur: number, curIdx, arr: number[]): number =>
                prev + cur);
        this.mDataPoints.map((val: IDataPoint, index: number, arr: IDataPoint[]): { min: Date, max: Date } =>
            ({ min: val.x, max: val.x }))
            .reduce((prev: { min: Date, max: Date },
                     cur: { min: Date, max: Date },
                     curIdx, arr: { min: Date, max: Date }[]): { min: Date, max: Date } => {
                if (prev) {
                    return {
                        max: (prev.max <= cur.max) ? cur.max : prev.max,
                        min: (prev.min >= cur.min) ? cur.min : prev.min,
                    };
                } else {
                    return cur;
                }
            }, undefined);
    }
}
