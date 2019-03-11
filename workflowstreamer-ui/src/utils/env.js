import { WORKFLOWSTREAMER_BASE } from '../constants/api';

export function getWorkflowStreamerBase() {
    // If NODE_ENV set to development, return dev link
    if (process && process.env && process.env.NODE_ENV === 'development') {
        return 'http://localhost';
    }

    // Otherwise, return local
    return WORKFLOWSTREAMER_BASE;
}

export function getAnalyticsBase() {
    return 'http://localhost:5000';
}
