import { Intent } from '@blueprintjs/core';

export function getDateString(date) {
    return date && new Date(date).toDateString();
}

export function getMonthYearFromDate(date) {
    return date.toLocaleString('en-us', { month: 'long' }) + ' ' + date.getFullYear();
}

export function getMonthsInRange(startDate, endDate) {
    const labels = [];
    while (startDate < endDate) {
        labels.push(getMonthYearFromDate(startDate));
        startDate.setMonth(startDate.getMonth() + 1)
    }
    return labels;
};

export function getIntentBasedOnDate(dueDate) {
    if (!dueDate) {
        return Intent.NONE;
    }

    const today = new Date().setHours(0, 0, 0, 0);
    const dayDiff = (dueDate - today) / (1000 * 3600 * 24);

    if (dayDiff < 0) {
        return Intent.DANGER;
    }

    if (dayDiff < 3) {
        return Intent.WARNING;
    }

    return Intent.SUCCESS;
}
