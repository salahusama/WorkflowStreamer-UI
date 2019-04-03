import ActionTypes from '../constants/actionTypes';

export default function teams(state = [], { type, payload }) {
    switch (type) {
        case ActionTypes.RECIEVED_TEAMS:
            return payload;
        case ActionTypes.ADDED_TEAM:
            return state.concat(payload);
        default:
            return state;
    }
}