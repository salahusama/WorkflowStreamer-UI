import Cookies from 'js-cookie';
import Session from '../constants/session';

export function updateSessionCookie(userId) {
    Cookies.set(Session.USER_ID, userId);
}

export function removeSessionCookie() {
    Cookies.remove(Session.USER_ID);
}

export function getFromSession(field) {
    return Cookies.get(field);
}
