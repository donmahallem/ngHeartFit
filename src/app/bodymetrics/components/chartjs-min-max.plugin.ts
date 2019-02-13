
interface TestAxis {
    getPixelForValue(value: number, index: number, datasetIndex: number, includeOffset: boolean): number;
    getValueForPixel(pixel: number);
}

export class ChartJsMinMaxPlugin {
    public beforeDatasetDraw(chart: Chart, options): void {
        const ctx = chart.ctx;
        const xaxis: TestAxis = (<any>chart).scales['x-axis-0'];;
        //const yAxisWeight: TestAxis = (<any>chart).scales['weightAxis'];
        //const yAxisFat: TestAxis = (<any>chart).scales['fatAxis'];
        const datasets = chart.data.datasets;
        ctx.save();

        for (let datasetId = 0; datasetId < datasets.length; datasetId++) {
            const dataset: Chart.ChartDataSets = datasets[datasetId];
            const yAxis: TestAxis = (<any>chart).scales[dataset.yAxisID];

            // get meta for both data sets
            var meta1 = chart.getDatasetMeta(datasetId);
            //var meta2 = chart.getDatasetMeta(dataset.fillBetweenSet);

            // do not draw fill if one of the datasets is hidden
            if (meta1.hidden) continue;
            if (meta1.data.length < 2) continue;
            ctx.beginPath();
            let curr = meta1.data[0];
            let next = meta1.data[1];
            let currDot = datasets[datasetId].data[curr._index];
            let nextDot = datasets[datasetId].data[next._index];
            let currValueY = yAxis.getPixelForValue(currDot['ymax'], 0, 0, false);
            let nextValueY = yAxis.getPixelForValue(nextDot['ymax'], 0, 0, false);
            ctx.moveTo(curr._view.x, currValueY);
            // create fill areas in pairs
            for (let p = 0; p < meta1.data.length - 1; p++) {
                curr = meta1.data[p];
                next = meta1.data[p + 1];
                currDot = datasets[datasetId].data[curr._index];
                nextDot = datasets[datasetId].data[next._index];
                currValueY = yAxis.getPixelForValue(currDot['ymax'], 0, 0, false);
                nextValueY = yAxis.getPixelForValue(nextDot['ymax'], 0, 0, false);
                if (curr._view.steppedLine === true) {
                    ctx.lineTo(next._view.x, currValueY);
                    ctx.lineTo(next._view.x, nextValueY);
                }
                else if (next._view.tension === 0) {
                    ctx.lineTo(next._view.x, nextValueY);
                }
                else {
                    ctx.bezierCurveTo(
                        curr._view.controlPointNextX,
                        currValueY,
                        next._view.controlPointPreviousX,
                        nextValueY,
                        next._view.x,
                        nextValueY
                    );
                }
            }
            currValueY = yAxis.getPixelForValue(nextDot['ymin'], 0, 0, false);
            ctx.lineTo(next._view.x, currValueY)
            for (let p = meta1.data.length - 1; p > 0; p--) {
                curr = meta1.data[p];
                next = meta1.data[p - 1];
                currDot = datasets[datasetId].data[curr._index];
                nextDot = datasets[datasetId].data[next._index];
                currValueY = yAxis.getPixelForValue(currDot['ymin'], 0, 0, false);
                nextValueY = yAxis.getPixelForValue(nextDot['ymin'], 0, 0, false);
                if (curr._view.steppedLine === true) {
                    ctx.lineTo(next._view.x, currValueY);
                    ctx.lineTo(next._view.x, nextValueY);
                }
                else if (next._view.tension === 0) {
                    ctx.lineTo(next._view.x, nextValueY);
                }
                else {
                    ctx.bezierCurveTo(
                        curr._view.controlPointPreviousX,
                        currValueY,
                        next._view.controlPointNextX,
                        nextValueY,
                        next._view.x,
                        nextValueY
                    );
                }
            }
            ctx.closePath();
            ctx.fillStyle = <string>dataset.backgroundColor;
            ctx.fill();
        }
    }
}