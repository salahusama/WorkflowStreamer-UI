import ActionTypes from '../constants/actionTypes';
import Status from '../constants/status';

const initialState = {
    members: {
        members: null,
        status: Status.PENDING,
    },
};

export default function teams(state = initialState, { type, payload }) {
    switch (type) {
        case ActionTypes.REQUESTED_TEAM_MEMBERS:
            return {
                ...state,
                members: initialState.members,
            };
        case ActionTypes.RECIEVED_TEAM_MEMBERS:
            return {
                ...state,
                members: {
                    members: payload,
                    status: Status.SUCCESS,
                }
            }
        default:
            return state;
    }
}