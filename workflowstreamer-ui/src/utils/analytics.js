import { getMonthsInRange, getMonthYearFromDate } from './DateUtil';
import { borderColors, backgroundColors } from '../constants/colors';

export function getChartData(events, details) {
    const { eventName, eventType, startDate, endDate } = details;

    const filteredEvents = events
        .filter(event => eventName && event.eventName === eventName)
        .filter(event => eventType && event.eventType === eventType)
        .filter(event => startDate && new Date(event.time) >= new Date(startDate))
        .filter(event => endDate && new Date(event.time) <= new Date(endDate));

    const months = getMonthsInRange(new Date(startDate), new Date(endDate));
    const data = months.map(label => 0);

    filteredEvents.forEach(event => {
        const dataIndex = months.indexOf(getMonthYearFromDate(new Date(event.time)));
        data[dataIndex] += 1;
    });

    const chartData = {
        labels: months,
        datasets: [{
            label: `${eventName} | ${eventType}`,
            data,
            borderWidth: 1,
            borderColor: Array(data.length).fill(borderColors).flat(),
            backgroundColor: Array(data.length).fill(backgroundColors).flat(),
        }],
    };

    return chartData;
}

/*
const barData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [{
        label: 'Tasks Created',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
    }],
};

const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [{
        fill: true,
        lineTension: .2,
        label: 'Tasks Completed',
        data: [8, 10, 1, 5, 7, 0],
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
    }],
};

const combinedLineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [{
        fill: false,
        lineTension: .2,
        label: 'Tasks Created',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: ['rgba(255, 99, 132, 0.2)'],
        borderColor: ['rgba(255,99,132,1)'],
        borderWidth: 1
    }, {
        fill: false,
        lineTension: .2,
        label: 'Tasks Created',
        data: [8, 10, 1, 5, 7, 0],
        backgroundColor: ['rgba(66, 166, 233, 0.2)'],
        borderColor: ['rgba(66, 166, 233, 1)'],
        borderWidth: 1
    }],
};
*/
