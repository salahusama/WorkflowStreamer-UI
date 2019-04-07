import * as TeamsApi from '../api/teams';
import ActionTypes from '../constants/actionTypes';

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
