import ActionTypes from '../constants/actionTypes';

export default function tasks(state = [], action) {
    switch (action.type) {
        case ActionTypes.RECIEVED_TASKS:
            return action.payload;
        case ActionTypes.ADDED_TASK:
            return state.concat(action.payload);
        default:
            return state;
    }
}