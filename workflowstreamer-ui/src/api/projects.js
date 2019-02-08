import { getWorkflowStreamerBase } from '../utils/env';

export function getUserProjects(userId) {
    const url = `${getWorkflowStreamerBase()}/projects?userId=${userId}`;
    return fetch(url);
}

export function addProject(newProject) {
    const url = `${getWorkflowStreamerBase()}/projects/project`;
    return fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProject),
    });
}
