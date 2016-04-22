import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';
import auth from './Auth';

const rootReducer = combineReducers({
    auth,
    router: routerStateReducer
});

export default rootReducer;
