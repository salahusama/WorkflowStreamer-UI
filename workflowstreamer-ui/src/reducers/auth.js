import ActionTypes from '../constants/actionTypes';
import Status from '../constants/status';

export default function auth(state = {}, action) {
    switch (action.type) {
        case ActionTypes.REQUESTED_LOGIN:
            return {
                ...state,
                status: Status.PENDING,
            };
        case ActionTypes.FAILED_LOGIN:
            return {
                ...state,
                status: Status.FAILED,
            };
        case ActionTypes.LOGIN:
            return {
                ...state,
                status: Status.COMPLETED,
                user: action.payload,
            };
        case ActionTypes.LOGOUT:
            return {
                ...state,
                user: null,
            };
        default:
            return state;
    }
}