export function getTasks() {
    const url = 'http://localhost/tasks';
    return fetch(url);
}

export function addTask({ creatorId, title, description }) {
    const url = 'http://localhost/tasks/task';
    return fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            creatorId,
            title,
            description,
        })
    });
}