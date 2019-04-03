import ActionTypes from '../constants/actionTypes';

const defaultState = {
    tasks: [],
    comments: {},
};

export default function tasks(state = defaultState, { type, payload }) {
    switch (type) {
        case ActionTypes.RECIEVED_TASKS:
            return {
                ...state,
                tasks: payload,
            };
        case ActionTypes.ADDED_TASK:
            return {
                ...state,
                tasks: state.tasks.concat(payload),
            };    
        case ActionTypes.UPDATED_TASK:
            return {
                ...state,
                tasks: state.tasks.filter(task => task.taskId !== payload.taskId).concat(payload),
            }
        case ActionTypes.RECIEVED_TASK_COMMENTS:
            return {
                ...state,
                comments: {
                    ...state.comments,
                    [payload.taskId]: payload.taskComments,
                },
            };
        case ActionTypes.ADDED_COMMENT:
            const currTaskComments = state.comments[payload.taskId] || [];
            return {
                ...state,
                comments: {
                    ...state.comments,
                    [payload.taskId]: currTaskComments.concat(payload),
                },
            };
        default:
            return state;
    }
}
