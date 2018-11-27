import ActionTypes from '../constants/actionTypes';
import * as AppApi from '../api/app';

export function sayHello(name) {
    return dispatch => {
        return AppApi.getHello(name)
            .then(response => response.text())
            .then(text => dispatch({
                type: ActionTypes.SAY_HELLO,
                payload: text,
            }));
    }
}