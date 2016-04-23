import {createReducer} from '../util/Reducers';
import * as types from '../constants';

const initialState = {
  token: null,
  username: null,
  isAuthenticated: false,
  isAuthenticating: false,
  statusText: null
};

export default createReducer(initialState, {
  [types.LOGIN_USER_REQUEST]: state => {
    return Object.assign({}, state, {
      isAuthenticating: true,
      statusText: null
    });
  },
  [types.LOGIN_USER_SUCCESS]: (state, payload) => {
    return Object.assign({}, state, {
      isAuthenticating: false,
      isAuthenticated: true,
      token: payload.token,
      userid: payload.userid,
      statusText: 'You have been successfully logged in.'
    });
  },
  [types.LOGIN_USER_FAILURE]: (state, payload) => {
    return Object.assign({}, state, {
      isAuthenticating: false,
      isAuthenticated: false,
      token: null,
      userid: null,
      statusText: `Authentication error: ${payload.status} ${payload.statusText}`
    });
  },
  [types.LOGOUT_USER_REQUEST]: state => {
    return Object.assign({}, state, {
      statusText: "Logging out"
    });
  },
  [types.LOGOUT_USER_FAILURE]: (state, payload) => {
    return Object.assign({}, state, {
      statusText: `Error logging out: ${payload.status} ${payload.statusText}`
    });
  },
  [types.LOGOUT_USER_SUCCESS]: state => {
    return Object.assign({}, state, {
      isAuthenticating: false,
      isAuthenticated: false,
      token: null,
      userid: null,
      statusText: 'Successfully logged out'
    });
  }
});
