import { Intent } from '@blueprintjs/core';
import ActionTypes from '../constants/actionTypes';
import * as AppApi from '../api/app';
import AppToaster from '../utils/AppToaster';

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
    return async dispatch => {
        dispatch({ type: ActionTypes.REQUESTED_LOGIN });
        const response = await AppApi.login(details);
        
        if (response.status === 200) {
            const json = await response.json(); 
            return dispatch({
                type: ActionTypes.LOGIN,
                payload: json,
            });
        } else {
            AppToaster.show({
                message: 'Error occured while loggin in. Please try again.',
                intent: Intent.DANGER,
            });
            return dispatch({ type: ActionTypes.FAILED_LOGIN });
        }
    };
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

export function addTask(taskDetails) {
    return (dispatch, getState) => {
        const newTask = {
            ...taskDetails,
            creatorId: getState().auth.user.userId,
        }
        return AppApi.addTask(newTask)
            .then(() => dispatch({ type: ActionTypes.ADDED_TASK }));
    }
}
