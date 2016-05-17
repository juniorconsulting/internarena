import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import auth from './auth';
import profile from './profile';

const rootReducer = combineReducers({
  auth,
  profile,
  routing: routerReducer
});

export default rootReducer;
