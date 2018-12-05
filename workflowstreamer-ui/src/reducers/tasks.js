import ActionTypes from '../constants/actionTypes';

export default function tasks(state = [], action) {
    switch (action.type) {
        case ActionTypes.RECIEVED_TASKS:
            return action.payload;
        default:
            return state;
    }
}