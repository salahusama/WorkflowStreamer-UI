import * as AnalyticsApi from '../api/analytics';
import ActionTypes from '../constants/actionTypes';
import AppToaster from '../utils/AppToaster';
import { Intent } from '@blueprintjs/core';

export function getEvents() {
    return dispatch => {
        dispatch({ type: ActionTypes.REQUESTED_EVENTS })
        AnalyticsApi.getEvents()
            .then(response => response.json())
            .then(json => {
                dispatch({
                    type: ActionTypes.RECIEVED_EVENTS,
                    payload: json,
                });
            });
    };
}

export function getChartOptions() {
    return (dispatch, getState) => {
        const userId = getState().auth.user.userId;
        dispatch({ type: ActionTypes.REQUESTED_CHART_OPTIONS })
        AnalyticsApi.getChartOptions(userId)
            .then(response => response.json())
            .then(json => {
                dispatch({
                    type: ActionTypes.RECIEVED_CHART_OPTIONS,
                    payload: json,
                });
            });
    };
}

export function submitChartOptions(chartOptions) {
    return (dispatch, getState) => {
        const userId = getState().auth.user.userId;
        dispatch({ type: ActionTypes.SENT_CHART_OPTIONS });
        AnalyticsApi.sendChartOptions(userId, chartOptions)
            .then(response => response.json())
            .then(json => {
                AppToaster.show({
                    message: 'Charts saved successfully.',
                    intent: Intent.SUCCESS,
                });
                dispatch({
                    type: ActionTypes.RECIEVED_CHART_OPTIONS,
                    payload: json,
                });
            });
    };
}
