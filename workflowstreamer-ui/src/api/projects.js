export function getUserProjects(userId) {
    const url = `http://localhost/projects?userId=${userId}`;
    return fetch(url);
}

export function addProject(newProject) {
    const url = 'http://localhost/projects/project';
    return fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProject),
    });
}