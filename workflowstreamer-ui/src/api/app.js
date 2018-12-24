export function logIn({ username, password }) {
    const url = 'http://localhost/users/user/login';
    return fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username,
            password,
        })
    });
}

export function signUp({ email, username, password }) {
    const url = 'http://localhost/users/user';
    return fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email,
            username,
            password,
        })
    });
}
