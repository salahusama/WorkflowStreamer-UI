export function getHello(name) {
    const url = name ? `http://localhost/hello?name=${name}` : 'http://localhost/hello';
    return fetch(url);
}

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