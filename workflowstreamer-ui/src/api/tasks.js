export function getUserTasks(userId) {
    const url = `http://localhost/tasks/user/${userId}`;
    return fetch(url);
}

export function addTask({ creatorId, title, description, projectId, stage }) {
    const url = 'http://localhost/tasks/task';
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
