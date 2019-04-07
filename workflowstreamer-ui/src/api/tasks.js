import { getWorkflowStreamerBase } from '../utils/env';

export function getUserTasks(userId) {
    const url = `${getWorkflowStreamerBase()}/tasks/user/${userId}`;
    return fetch(url);
}

export function getUserTeamTasks(userId) {
    const url = `${getWorkflowStreamerBase()}/tasks/teams/user/${userId}/beta`;
    return fetch(url);
}

export function addTask({ creatorId, title, description, projectId, stage }) {
    const url = `${getWorkflowStreamerBase()}/tasks/task`;
    return fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            creatorId,
            title,
            description,
            projectId,
            stage,
        })
    });
}

export function updateTask(updatedDetails) {
    const url = `${getWorkflowStreamerBase()}/tasks/task`;
    return fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedDetails),
    });
}

export function getTaskComments(taskId) {
    const url = `${getWorkflowStreamerBase()}/tasks/task/${taskId}/comments`;
    return fetch(url);
}

export function addComment(newComment) {
    const url = `${getWorkflowStreamerBase()}/tasks/task/${newComment.taskId}/comments`;
    return fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newComment),
    });
}
