import ActionTypes from '../constants/actionTypes';

export default function userStages(state = [], action) {
    switch (action.type) {
        case ActionTypes.RECIEVED_STAGES:
            return action.payload;
        default:
            return state;
    }
}