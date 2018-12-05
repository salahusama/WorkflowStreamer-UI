export function getHello(name) {
    const url = name ? `http://localhost/hello?name=${name}` : 'http://localhost/hello';
    return fetch(url);
}

export function login({ username, password }) {
    const url = 'http://localhost/users/login';
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password,
        })
    });
}

export function getTasks() {
    const url = 'http://localhost/tasks';
    return fetch(url);
}