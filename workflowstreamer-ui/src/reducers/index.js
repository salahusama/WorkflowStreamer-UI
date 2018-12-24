import { combineReducers } from 'redux';
import auth from './auth';
import tasks from './tasks';
import userStages from './userStages';
import projects from './projects';

export default combineReducers({
    auth,
    tasks,
    userStages,
    projects,
});
