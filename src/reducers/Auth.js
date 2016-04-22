import {createReducer} from '../util/Reducers';
import {LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE} from '../constants';

const initialState = {
  token: null,
  username: null,
  isAuthenticated: false,
  isAuthenticating: false,
  statusText: null
};

export default createReducer(initialState, {
  [LOGIN_USER_REQUEST]: state => {
    return Object.assign({}, state, {
      isAuthenticating: true,
      statusText: null
    });
  },
  [LOGIN_USER_SUCCESS]: (state, payload) => {
    return Object.assign({}, state, {
      isAuthenticating: false,
      isAuthenticated: true,
      token: payload.token,
      userid: payload.userid,
      statusText: 'You have been successfully logged in.'
    });
  },
  [LOGIN_USER_FAILURE]: (state, payload) => {
    return Object.assign({}, state, {
      isAuthenticating: false,
      isAuthenticated: false,
      token: null,
      userid: null,
      statusText: `Authentication error: ${payload.status} ${payload.statusText}`
    });
  }
});
