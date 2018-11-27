import ActionTypes from '../constants/actionTypes';

export default function hello(state = {}, action) {
    switch (action.type) {
        case ActionTypes.SAY_HELLO:
            return {
                ...state,
                hello: action.payload,
            };
        default:
            return state;
    }
}