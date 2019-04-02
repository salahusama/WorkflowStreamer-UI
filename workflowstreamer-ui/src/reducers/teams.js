import ActionTypes from '../constants/actionTypes';

export default function teams(state = {}, { type, payload }) {
    switch (type) {
        case ActionTypes.RECIEVED_TEAMS:
            return {
                ...state,
                teams: payload,
            };
        case ActionTypes.ADDED_TEAM:
            return {
                ...state,
                teams: state.teams.concat(payload),
            };
        default:
            return state;
    }
}