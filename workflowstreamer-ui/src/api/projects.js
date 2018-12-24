export function getUserProjects(userId) {
    const url = `http://localhost/projects?userId=${userId}`;
    return fetch(url);
}
