import ActionTypes from '../constants/actionTypes';

export default function projects(state = {}, action) {
    switch (action.type) {
        case ActionTypes.RECIEVED_PROJECTS:
            return {
                ...state,
                projects: action.payload,
            };
        case ActionTypes.ADDED_PROJECT:
            return {
                ...state,
                projects: state.projects.concat(action.payload),
            };
        case ActionTypes.UPDATED_SELECTED_PROJECT:
            return {
                ...state,
                selectedProject: action.payload,
            };
        default:
            return state;
    }
}