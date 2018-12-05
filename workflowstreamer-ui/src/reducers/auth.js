import ActionTypes from '../constants/actionTypes';

export default function auth(state = {}, action) {
    switch (action.type) {
        case ActionTypes.LOGIN:
            return {
                ...state,
                user: action.payload,
            };
        default:
            return state;
    }
}