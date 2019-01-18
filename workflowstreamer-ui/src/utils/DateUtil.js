import { Intent } from '@blueprintjs/core';

export function getDateString(date) {
    return new Date(date).toDateString()
}

export function getIntentBasedOnDate(dueDate) {
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