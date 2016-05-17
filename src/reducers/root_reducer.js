import {combineReducers} from 'redux';
import {routerStateReducer} from 'redux-router';
import auth from './auth';
import profile from './profile';

const rootReducer = combineReducers({
  auth,
  profile,
  router: routerStateReducer
});

export default rootReducer;
