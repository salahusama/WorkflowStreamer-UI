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
    const { email, username, password, signup } = details;
    const loginDetails = { username, password };
    const signupDetails = { email, username, password };

    if (signup) {
        return async dispatch => {
            dispatch({ type: ActionTypes.REQUESTED_SIGNUP });
            const response = await AppApi.signUp(signupDetails);
            
            switch (response.status) {
                case 200:
                    const json = await response.json();
                    AppToaster.show({
                        message: `Welcome to Workflow Streamer, ${username}!`,
                        intent: Intent.SUCCESS,
                    }); 
                    dispatch({ type: ActionTypes.SIGNUP })
                    return dispatch({
                        type: ActionTypes.LOGIN,
                        payload: json,
                    });
                case 403:
                    AppToaster.show({
                        message: 'Sorry, this username is already taken. Please try a different username.',
                        intent: Intent.WARNING,
                    });
                    return dispatch({ type: ActionTypes.FAILED_SIGNUP });
                default:
                    AppToaster.show({
                        message: 'Error occured while signing up. Please try again.',
                        intent: Intent.DANGER,
                    });
                    return dispatch({ type: ActionTypes.FAILED_SIGNUP });
            }
        };
    }

    return async dispatch => {
        dispatch({ type: ActionTypes.REQUESTED_LOGIN });
        const response = await AppApi.logIn(loginDetails);
        
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
    return async (dispatch, getState) => {
        const newTask = {
            ...taskDetails,
            creatorId: getState().auth.user.userId,
        };
        const response = await AppApi.addTask(newTask);
        
        if (response.status === 200) {
            const json = await response.json(); 
            AppToaster.show({
                message: 'Task added successfully.',
                intent: Intent.SUCCESS,
            });
            return dispatch({
                type: ActionTypes.ADDED_TASK,
                payload: json,
            });
        } else {
            AppToaster.show({
                message: 'Error occured while adding new task. Please try again.',
                intent: Intent.DANGER,
            });
            return dispatch({ type: ActionTypes.FAILED_TASK_ADITION });
        }
    };
}
