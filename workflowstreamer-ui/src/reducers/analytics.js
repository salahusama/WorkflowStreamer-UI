import ActionTypes from '../constants/actionTypes';
import Status from '../constants/status';

const initialState = {
    events: {
        status: null,
        events: null,
    },
    options: {
        status: null,
        options: [{ id: 1, details: {} }],
    },
};

export default function analytics(state = initialState, { type, payload }) {
    switch (type) {
        case ActionTypes.REQUESTED_EVENTS:
            return {
                ...state,
                events: {
                    ...state.events,
                    status: Status.PENDING,
                },
            };
        case ActionTypes.RECIEVED_EVENTS:
            return {
                ...state,
                events: {
                    ...state.events,
                    status: Status.SUCCESS,
                    events: payload,
                },
            };
            case ActionTypes.REQUESTED_CHART_OPTIONS:
            return {
                ...state,
                options: {
                    ...state.options,
                    status: Status.PENDING,
                },
            };
        case ActionTypes.RECIEVED_CHART_OPTIONS:
            return {
                ...state,
                options: {
                    ...state.options,
                    status: Status.SUCCESS,
                    options: payload,
                },
            };
        default:
            return state;
    }
}