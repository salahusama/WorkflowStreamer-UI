import * as TeamsApi from '../api/teams';
import ActionTypes from '../constants/actionTypes';
import AppToaster from '../utils/AppToaster';
import { Intent } from '@blueprintjs/core';

export function getTeamById(teamId) {
    return (dispatch, getState) => {
        const teams = getState().auth.user.teams;
        return teams.find(team => team.teamId === teamId)
    }
}

export function getTeamMembers(teamId) {
    return async dispatch => {
        dispatch({ type: ActionTypes.REQUESTED_TEAM_MEMBERS });
        const response = await TeamsApi.getTeamMembers(teamId);

        if (response.status === 200) {
            const json = await response.json(); 
            return dispatch({
                type: ActionTypes.RECIEVED_TEAM_MEMBERS,
                payload: json,
            });
        }
    }
}

export function addUserToTeam(teamId, userEmail) {
    return async dispatch => {
        const response = await TeamsApi.addUserToTeam(teamId, userEmail);

        switch(response.status) {
            case 200:
                const json = await response.json(); 
                AppToaster.show({
                    message: 'User added successfully.',
                    intent: Intent.SUCCESS,
                });
                return dispatch({
                    type: ActionTypes.ADDED_USER_TO_TEAM,
                    payload: json,
                });
            case 304:
                AppToaster.show({
                    message: 'Hmm... The user was not added.',
                    intent: Intent.WARNING,
                });
                return dispatch({ type: ActionTypes.FAILED_ADDING_USER_TO_TEAM });
            default:
                AppToaster.show({
                    message: 'Error occured while adding user. Please try again.',
                    intent: Intent.DANGER,
                });
                return dispatch({ type: ActionTypes.FAILED_ADDING_USER_TO_TEAM });
        }
    }
}
