import { ChartConfiguration } from 'chart.js';
import { ChartJsMinMaxPlugin } from './chartjs-min-max.plugin';

export const chartConfig: ChartConfiguration = {
    type: 'line',
    data: {
        datasets: [{
            label: 'Weight',
            pointRadius: 3,
            pointHoverRadius: 10,
            type: 'line',
            borderColor: '#004ba0',
            pointBackgroundColor: 'rgba(0,75,160,0.5)',
            fill: false,
            backgroundColor: 'rgba(0,75,160,0.5)',
            data: [],
            yAxisID: 'weightAxis'
        }, {
            label: 'Body Fat',
            pointRadius: 3,
            pointHoverRadius: 10,
            type: 'line',
            borderColor: 'rgb(255,160,0)',
            pointBackgroundColor: 'rgba(0,75,160,0.5)',
            fill: false,
            backgroundColor: 'rgb(255,160,0,0.5)',
            data: [],
            yAxisID: 'fatAxis',
            steppedLine: true
        }]
    },
    plugins: [new ChartJsMinMaxPlugin()],
    options: {
        responsive: true,
        maintainAspectRatio: false,
        title: {
            display: true,
            text: 'Chart.js Time Point Data'
        },
        scales: {
            xAxes: [{
                type: 'time',
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Date'
                },
                ticks: {
                    major: {
                        fontStyle: 'bold',
                        fontColor: '#FF0000'
                    }
                },
                id: 'x-axis-0'
            }],
            yAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Weight'
                },

                ticks: {
                    beginAtZero: true
                },
                id: 'weightAxis'
            }, {
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Body Fat Percentage'
                },
                ticks: {
                    beginAtZero: true,
                    suggestedMin: 0,
                    suggestedMax: 100
                },
                position: 'right',
                id: 'fatAxis'
            }]
        },
        layout: {
            padding: {
                left: 20,
                right: 20,
                top: 10,
                bottom: 10
            }
        }
    }
};
