import { Intent } from '@blueprintjs/core';
import ActionTypes from '../constants/actionTypes';
import * as AppApi from '../api/app';
import * as UsersApi from '../api/user';
import * as TasksApi from '../api/tasks';
import * as ProjectsApi from '../api/projects';
import AppToaster from '../utils/AppToaster';
import { removeNull } from '../utils/ObjectUtils';

function signUp(signupDetails) {
    return async dispatch => {

        dispatch({ type: ActionTypes.REQUESTED_SIGNUP });
        const response = await AppApi.signUp(signupDetails);
        
        switch (response.status) {
            case 200:
                const json = await response.json();
                AppToaster.show({
                    message: `Welcome to Workflow Streamer, ${signupDetails.username}!`,
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
    }
}

export function logIn(details) {
    const { email, username, password, signup } = details;
    const loginDetails = { username, password };
    const signupDetails = { email, username, password };

    if (signup) {
        return signUp(signupDetails);
    }

    return async dispatch => {
        dispatch({ type: ActionTypes.REQUESTED_LOGIN });
        const response = await AppApi.logIn(loginDetails);
        
        switch (response.status) {
            case 200:
                const json = await response.json(); 
                return dispatch({
                    type: ActionTypes.LOGIN,
                    payload: json,
                });
            case 404:
                AppToaster.show({
                    message: 'Username and password do not match. Please try again.',
                    intent: Intent.WARNING,
                });
                return dispatch({ type: ActionTypes.FAILED_LOGIN });
            default:
                AppToaster.show({
                    message: 'Error occured while loggin in. Please try again.',
                    intent: Intent.DANGER,
                });
                return dispatch({ type: ActionTypes.FAILED_LOGIN });
        }
    };
}

export function logout() {
    AppToaster.show({
        message: 'You have been logged out.',
        intent: Intent.WARNING,
    });

    return { type: ActionTypes.LOGOUT };
}

export function getTasks() {
    return async (dispatch, getState) => {
        const { userId } = getState().auth.user;
        return TasksApi.getUserTasks(userId)
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
        const response = await TasksApi.addTask(newTask);
        
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

export function updateTask(updatedTask) {
    const updatedDetails = removeNull(updatedTask);
    return async (dispatch) => {
        const response = await TasksApi.updateTask(updatedDetails);
        
        switch(response.status) {
            case 200:
                const json = await response.json(); 
                AppToaster.show({
                    message: 'Task updated successfully.',
                    intent: Intent.SUCCESS,
                });
                return dispatch({
                    type: ActionTypes.UPDATED_TASK,
                    payload: json,
                });
            case 304:
                AppToaster.show({
                    message: 'Hmm... The task was not updated.',
                    intent: Intent.WARNING,
                });
                return dispatch({ type: ActionTypes.FAILED_TASK_UPDATE });
            default:
                AppToaster.show({
                    message: 'Error occured while adding new task. Please try again.',
                    intent: Intent.DANGER,
                });
                return dispatch({ type: ActionTypes.FAILED_TASK_UPDATE });
        }
    };
}

export function addProject(projectDetails) {
    return async (dispatch, getState) => {
        const newProject = {
            ...projectDetails,
            creatorId: getState().auth.user.userId,
        };
        const response = await ProjectsApi.addProject(newProject);
        
        if (response.status === 200) {
            const json = await response.json(); 
            AppToaster.show({
                message: 'Project added successfully.',
                intent: Intent.SUCCESS,
            });
            return dispatch({
                type: ActionTypes.ADDED_PROJECT,
                payload: json,
            });
        } else {
            AppToaster.show({
                message: 'Error occured while adding new project. Please try again.',
                intent: Intent.DANGER,
            });
            return dispatch({ type: ActionTypes.FAILED_PROJECT_ADITION });
        }
    };
}


export function getUserStages() {
    return async (dispatch, getState) => {
        const { userId } = getState().auth.user;
        const response = await UsersApi.getUserStages(userId);
        const json = await response.json();

        if (response.status === 200) {
            const stageNames = json.map(stage => (stage.stage));
            return dispatch({
                type: ActionTypes.RECIEVED_STAGES,
                payload: stageNames,
            });
        } else {
            return dispatch({ type: ActionTypes.FAILED_STAGES });
        }
    }
}

export function getProjects() {
    return async (dispatch, getState) => {
        const { userId } = getState().auth.user;
        return ProjectsApi.getUserProjects(userId)
            .then(response => response.json())
            .then(json => dispatch({
                type: ActionTypes.RECIEVED_PROJECTS,
                payload: json,
            }));
    };
}

export function updateSelectedProject(project) {
    return {
        type: ActionTypes.UPDATED_SELECTED_PROJECT,
        payload: project,
    };
}
