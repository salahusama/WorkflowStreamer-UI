import { getWorkflowStreamerBase } from '../utils/env';

export function logIn({ username, password }) {
    const url = `${getWorkflowStreamerBase()}/users/user/login`;
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
    const url = `${getWorkflowStreamerBase()}/users/user`;
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
