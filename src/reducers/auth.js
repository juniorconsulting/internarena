import {createReducer} from '../util/reducers';
import * as types from '../constants';

export const initialState = {
  token: null,
  userid: null,
  isAuthenticated: false,
  pending: false,
  statusText: null
};

export default createReducer(initialState, {
  [types.LOGIN_USER_REQUEST]: state => {
    return Object.assign({}, state, {
      pending: true,
      statusText: "Logging in."
    });
  },
  [types.LOGIN_USER_SUCCESS]: (state, payload) => {
    return Object.assign({}, state, {
      pending: false,
      isAuthenticated: true,
      token: payload.token,
      userid: payload.userid,
      statusText: 'You have been successfully logged in.'
    });
  },
  [types.LOGIN_USER_FAILURE]: (state, payload) => {
    return Object.assign({}, state, {
      pending: false,
      isAuthenticated: false,
      token: null,
      userid: null,
      statusText: `Authentication error: ${payload.status} ${payload.statusText}.`
    });
  },
  [types.LOGOUT_USER_REQUEST]: state => {
    return Object.assign({}, state, {
      statusText: "Logging out."
    });
  },
  [types.LOGOUT_USER_FAILURE]: (state, payload) => {
    return Object.assign({}, state, {
      statusText: `Error logging out: ${payload.status} ${payload.statusText}.`
    });
  },
  [types.LOGOUT_USER_SUCCESS]: state => {
    return Object.assign({}, state, {
      pending: false,
      isAuthenticated: false,
      token: null,
      userid: null,
      statusText: 'Successfully logged out.'
    });
  },
  [types.REGISTER_USER_REQUEST]: state => {
    return Object.assign({}, state, {
      token: null,
      userid: null,
      isAuthenticated: false,
      pending: true,
      statusText: null
    });
  },
  [types.REGISTER_USER_SUCCESS]: state => {
    return Object.assign({}, state, {
      token: null,
      userid: null,
      isAuthenticated: false,
      pending: false,
      statusText: null
    });
  },
  [types.REGISTER_USER_FAILURE]: (state, payload) => {
    let errorMessages = [];
    for (var f in payload) {
      if (!payload.hasOwnProperty(f)) {
        continue;
      }
      errorMessages.push(payload[f]);
    }
    return Object.assign({}, state, {
      token: null,
      userid: null,
      isAuthenticated: false,
      pending: false,
      statusText: errorMessages.join()
    });
  }
});
