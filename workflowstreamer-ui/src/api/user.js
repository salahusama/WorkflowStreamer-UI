export function getUserStages(userId) {
    const url = `http://localhost/users/user/${userId}/stages`;
    return fetch(url);
}

export function getUserById(userId) {
    const url = `http://localhost/users/user/${userId}`;
    return fetch(url);
}
