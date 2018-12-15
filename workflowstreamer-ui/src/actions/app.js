import ActionTypes from '../constants/actionTypes';
import * as AppApi from '../api/app';

export function sayHello(name) {
    return dispatch => {
        return AppApi.getHello(name)
            .then(response => response.text())
            .then(text => dispatch({
                type: ActionTypes.SAY_HELLO,
                payload: text,
            }));
    }
}

export function logIn(details) {
    return dispatch => {
        return AppApi.login(details)
            .then(response => response.json())
            .then(json => dispatch({
                type: ActionTypes.LOGIN,
                payload: json,
            }));
    }
}

export function getTasks() {
    return dispatch => {
        return AppApi.getTasks()
            .then(response => response.json())
            .then(json => dispatch({
                type: ActionTypes.RECIEVED_TASKS,
                payload: json,
            }));
    }
}
