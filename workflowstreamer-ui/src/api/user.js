import { getWorkflowStreamerBase } from '../utils/env';

export function getUserStages(userId) {
    const url = `${getWorkflowStreamerBase()}/users/user/${userId}/stages`;
    return fetch(url);
}

export function getUserById(userId) {
    const url = `${getWorkflowStreamerBase()}/users/user/${userId}`;
    return fetch(url);
}
