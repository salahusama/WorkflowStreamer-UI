import ActionTypes from '../constants/actionTypes';

export default function tasks(state = [], { type, payload }) {
    switch (type) {
        case ActionTypes.RECIEVED_TASKS:
            return payload;
        case ActionTypes.ADDED_TASK:
            return state.concat(payload);
        case ActionTypes.UPDATED_TASK:
            return state.filter(task => task.taskId !== payload.taskId).concat(payload);
        default:
            return state;
    }
}
