import expect from 'expect';

import auth from '../../src/reducers/auth.js';
import * as types from '../../src/constants/';

describe('Auth reducer', () => {
  it('has clean initial state', () => {
    const expectedState = {
      token: null,
      userid: null,
      isAuthenticated: false,
      isAuthenticating: false,
      statusText: null
    };

    expect(auth(undefined, {})).toEqual(expectedState);
  });

  it('handles LOGIN_USER_REQUEST', () => {
    const expectedState = {
      token: null,
      userid: null,
      isAuthenticated: false,
      isAuthenticating: true,
      statusText: "Logging in."
    };

    expect(auth(undefined, {type: types.LOGIN_USER_REQUEST})).toEqual(expectedState);
  });

  it('handles LOGIN_USER_SUCCESS', () => {
    const expectedState = {
      token: 'token',
      userid: 1,
      isAuthenticated: true,
      isAuthenticating: false,
      statusText: "You have been successfully logged in."
    };

    expect(auth(undefined, {
      type: types.LOGIN_USER_SUCCESS,
      payload: {token: 'token', userid: 1}
    })).toEqual(expectedState);
  });

  it('handles LOGIN_USER_FAILURE', () => {
    const requestState = {
      token: null,
      userid: null,
      isAuthenticated: false,
      isAuthenticating: true,
      statusText: null
    };

    const expectedState = {
      token: null,
      userid: null,
      isAuthenticated: false,
      isAuthenticating: false,
      statusText: "Authentication error: 1 error."
    };

    expect(auth(requestState, {
      type: types.LOGIN_USER_FAILURE,
      payload: {status: 1, statusText: "error"}
    })).toEqual(expectedState);
  });

  it('handles LOGOUT_USER_REQUEST', () => {
    const previousState = {
      token: 'token',
      userid: 1,
      isAuthenticated: true,
      isAuthenticating: false,
      statusText: ""
    };

    const expectedState = {
      token: 'token',
      userid: 1,
      isAuthenticated: true,
      isAuthenticating: false,
      statusText: "Logging out."
    };

    expect(auth(previousState, {
      type: types.LOGOUT_USER_REQUEST
    })).toEqual(expectedState);
  });

  it('handles LOGOUT_USER_SUCCESS', () => {
    const previousState = {
      token: 'token',
      userid: 1,
      isAuthenticated: true,
      isAuthenticating: false,
      statusText: "Logging out."
    };

    const expectedState = {
      token: null,
      userid: null,
      isAuthenticated: false,
      isAuthenticating: false,
      statusText: "Successfully logged out."
    };

    expect(auth(previousState, {
      type: types.LOGOUT_USER_SUCCESS
    })).toEqual(expectedState);
  });

  it('handles LOGOUT_USER_FAILURE', () => {
    const previousState = {
      token: 'token',
      userid: 1,
      isAuthenticated: true,
      isAuthenticating: false,
      statusText: "Logging out."
    };

    const expectedState = {
      token: 'token',
      userid: 1,
      isAuthenticated: true,
      isAuthenticating: false,
      statusText: "Error logging out: 1 error."
    };

    expect(auth(previousState, {
      type: types.LOGOUT_USER_FAILURE,
      payload: {status: 1, statusText: "error"}
    })).toEqual(expectedState);
  });
});
