import { getAnalyticsBase } from '../utils/env';

export function getEvents() {
    const url = `${getAnalyticsBase()}/events`;
    return fetch(url);
}

export function getChartOptions(userId) {
    const url = `${getAnalyticsBase()}/users/${userId}/options`;
    return fetch(url);
}

export function sendChartOptions(userId, chartOptions) {
    const url = `${getAnalyticsBase()}/users/${userId}/options`;
    return fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(chartOptions)
    });
}
