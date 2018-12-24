import { combineReducers } from 'redux';
import auth from './auth';
import tasks from './tasks';
import userStages from './userStages';

export default combineReducers({
    auth,
    tasks,
    userStages,
});
