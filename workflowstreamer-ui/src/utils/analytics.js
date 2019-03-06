import { borderColors } from '../constants/colors';

function getMonthsInRange(min, max) {
    return ['December', 'January', 'February', 'March']
    // const startDate = new Date(min);
    // const endDate = new Date(max);
    // const months = [];
    // const currDate = startDate;

    // while (currDate.getTime() < endDate.getTime()) {
    //     months.push(currDate.getDay());
    //     currDate.setDate(currDate.getDate() + 1);
    // }

    // return months;
}

export function getEventCountOverTime(eventName, eventType, events) {
    const targetEvents = events.filter(event => event.eventName === eventName && event.eventType === eventType);
    const eventDates = targetEvents.map(event => event.time && new Date(event.time));
    const months = getMonthsInRange(Math.min(...eventDates), Math.max(...eventDates));
    const data = months.map(m => 0);

    eventDates.forEach(date => {
        const dMonth = date.toLocaleString('en-us', { month: 'long' });
        const index = months.indexOf(dMonth);
        if (index > -1) {
            data[index] = data[index] + 1;
        }
    });

    return {
        labels: months,
        datasets: [{
            fill: false,
            label: `${eventName} | ${eventType}`,
            data: [0, 1, data[2], data[3]],
            borderColor: data.map((item, index) => borderColors[index % borderColors.length]),
            backgroundColor: data.map((item, index) => borderColors[index % borderColors.length]),
        }],
    };
}