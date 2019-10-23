export interface DataPoint {
    x: Date;
    y: number;
}

export class MinMaxDataPoint implements DataPoint {

    private mY = 0;
    private mX: Date = new Date();
    private mDataPoints: DataPoint[] = [];

    public add(point: DataPoint): void {
        this.mDataPoints.push(point);
        this.recalculate();
    }

    public recalculate(): void {
        this.mY = this.mDataPoints.map((val: DataPoint, index: number, arr: DataPoint[]): number =>
            val.y).reduce((prev: number, cur: number, curIdx, arr: number[]): number =>
            prev + cur);
        this.mDataPoints.map((val: DataPoint, index: number, arr: DataPoint[]): { min: Date, max: Date } =>
            ({ min: val.x, max: val.x })).reduce((prev: { min: Date, max: Date }, cur: { min: Date, max: Date }, curIdx, arr: { min: Date, max: Date }[]): { min: Date, max: Date } => {
            if (prev) {
                return {
                    min: (prev.min >= cur.min) ? cur.min : prev.min,
                    max: (prev.max <= cur.max) ? cur.max : prev.max,
                };
            } else {
                return cur;
            }
        }, null);
    }

    public get x(): Date {
        return this.mX;
    }

    public get y(): number {
        return this.mY;
    }
}
