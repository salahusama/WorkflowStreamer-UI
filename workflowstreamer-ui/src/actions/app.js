import { Intent } from '@blueprintjs/core';
import ActionTypes from '../constants/actionTypes';
import * as AppApi from '../api/app';
import * as UsersApi from '../api/user';
import * as TasksApi from '../api/tasks';
import * as ProjectsApi from '../api/projects';
import * as TeamsApi from '../api/teams';
import AppToaster from '../utils/AppToaster';
import { removeNull } from '../utils/ObjectUtils';
import Session from '../constants/session';
import { getFromSession, updateSessionCookie, removeSessionCookie } from '../utils/SessionUtil';

function signUp(signupDetails) {
    return async dispatch => {

        dispatch({ type: ActionTypes.REQUESTED_SIGNUP });
        const response = await AppApi.signUp(signupDetails);
        
        switch (response.status) {
            case 200:
                const json = await response.json();
                updateSessionCookie(json.userId);
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
                let json = {};
                try {
                    json = await response.json();
                } catch (error) {
                    AppToaster.show({
                        message: "It seems like an error occurred during login. Please try again.",
                        intent: Intent.DANGER,
                    });
                    return dispatch({ type: ActionTypes.FAILED_LOGIN });
                }
                updateSessionCookie(json.userId);
                AppToaster.show({
                    message: "Login Successful",
                    intent: Intent.SUCCESS,
                });
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
    removeSessionCookie();
    AppToaster.show({
        message: 'You have been logged out.',
        intent: Intent.WARNING,
    });

    return { type: ActionTypes.LOGOUT };
}

export function getTasks() {
    return async (dispatch, getState) => {
        const { userId } = getState().auth.user;
        return TasksApi.getUserTeamTasks(userId)
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


export function getStages() {
    return async (dispatch, getState) => {
        const { userId } = getState().auth.user;
        const response = await UsersApi.getStages(userId);
        const json = await response.json();

        if (response.status === 200) {
            const stages = json
                .sort((a, b) => a.viewOrder - b.viewOrder)
                .map(stage => (stage.stage));
            return dispatch({
                type: ActionTypes.RECIEVED_STAGES,
                payload: stages,
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

export function restoreSession() {
    const userId = getFromSession(Session.USER_ID);

    if (!userId) {
        return { type: ActionTypes.NO_SESSION };
    }

    // This is to correct in rare cases where this breaks
    if (userId === 'undefined') {
        removeSessionCookie(Session.USER_ID);
        return restoreSession();
    }

    return async (dispatch) => {
        return UsersApi.getUserById(userId)
            .then(response => response.json())
            .then(json => {
                updateSessionCookie(json.userId);
                AppToaster.show({
                    message: `Welcome back, ${json.username}`,
                    intent: Intent.SUCCESS,
                });
                dispatch({
                    type: ActionTypes.LOGIN,
                    payload: json,
                });
            });
    };
}

export function addTeam(teamDetails) {
    return async (dispatch, getState) => {
        const newTeam = {
            ...teamDetails,
            userId: getState().auth.user.userId,
        };
        const response = await TeamsApi.addTeam(newTeam);
        
        if (response.status === 200) {
            const json = await response.json(); 
            AppToaster.show({
                message: 'Team added successfully.',
                intent: Intent.SUCCESS,
            });
            return dispatch({
                type: ActionTypes.ADDED_TEAM,
                payload: json,
            });
        } else {
            AppToaster.show({
                message: 'Error occured while adding new team. Please try again.',
                intent: Intent.DANGER,
            });
            return dispatch({ type: ActionTypes.FAILED_PROJECT_ADITION });
        }
    };
}

export function getTaskComments(taskId) {
    return async (dispatch) => {
        return TasksApi.getTaskComments(taskId)
            .then(response => response.json())
            .then(json => dispatch({
                type: ActionTypes.RECIEVED_TASK_COMMENTS,
                payload: {
                    taskId,
                    taskComments: json,
                },
            }));
    };
}

export function addComment(comment) {
    return async (dispatch, getState) => {
        const newComment = {
            ...comment,
            creatorId: getState().auth.user.userId,
        };
        const response = await TasksApi.addComment(newComment);
        
        if (response.status === 200) {
            const json = await response.json(); 
            AppToaster.show({
                message: 'Comment added successfully.',
                intent: Intent.SUCCESS,
            });
            return dispatch({
                type: ActionTypes.ADDED_COMMENT,
                payload: json,
            });
        } else {
            AppToaster.show({
                message: 'Error occured while adding new comment. Please try again.',
                intent: Intent.DANGER,
            });
            return dispatch({ type: ActionTypes.FAILED_COMMENT_ADITION });
        }
    };
}
