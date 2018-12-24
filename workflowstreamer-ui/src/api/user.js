export function getUserStages(userId) {
    const url = `http://localhost/users/user/${userId}/stages`;
    return fetch(url);
}
