import { combineReducers } from 'redux';
import auth from './auth';
import hello from './hello';
import tasks from './tasks';

export default combineReducers({
    auth,
    hello,
    tasks,
});