import expect from 'expect';

import auth from '../../src/reducers/auth.js';
import * as types from '../../src/constants/';

describe('Auth reducer', () => {
  it('has clean initial state', () => {
    const expectedState = {
      token: null,
      userid: null,
      isAuthenticated: false,
      pending: false,
      statusText: null
    };

    expect(auth(undefined, {})).toEqual(expectedState);
  });

  it('handles LOGIN_USER_REQUEST', () => {
    const expectedState = {
      token: null,
      userid: null,
      isAuthenticated: false,
      pending: true,
      statusText: "Logging in."
    };

    expect(auth(undefined, {type: types.LOGIN_USER_REQUEST})).toEqual(expectedState);
  });

  it('handles LOGIN_USER_SUCCESS', () => {
    const expectedState = {
      token: 'token',
      userid: 1,
      isAuthenticated: true,
      pending: false,
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
      pending: true,
      statusText: null
    };

    const expectedState = {
      token: null,
      userid: null,
      isAuthenticated: false,
      pending: false,
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
      pending: false,
      statusText: ""
    };

    const expectedState = {
      token: 'token',
      userid: 1,
      isAuthenticated: true,
      pending: false,
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
      pending: false,
      statusText: "Logging out."
    };

    const expectedState = {
      token: null,
      userid: null,
      isAuthenticated: false,
      pending: false,
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
      pending: false,
      statusText: "Logging out."
    };

    const expectedState = {
      token: 'token',
      userid: 1,
      isAuthenticated: true,
      pending: false,
      statusText: "Error logging out: 1 error."
    };

    expect(auth(previousState, {
      type: types.LOGOUT_USER_FAILURE,
      payload: {status: 1, statusText: "error"}
    })).toEqual(expectedState);
  });

  it('handles REGISTER_USER_REQUEST', () => {
    const previousState = {
      token: null,
      userid: null,
      isAuthenticated: false,
      pending: false,
      statusText: null
    };

    const newState = {
      token: null,
      userid: null,
      isAuthenticated: false,
      pending: true,
      statusText: null
    };

    expect(auth(previousState, {
      type: types.REGISTER_USER_REQUEST
    })).toEqual(newState);
  });

  it('handles REGISTER_USER_SUCCESS', () => {
    const previousState = {
      token: null,
      userid: null,
      isAuthenticated: false,
      pending: true,
      statusText: null
    };

    const newState = {
      token: null,
      userid: null,
      isAuthenticated: false,
      pending: false,
      statusText: null
    };

    expect(auth(previousState, {
      type: types.REGISTER_USER_SUCCESS
    })).toEqual(newState);
  });

  it('handles REGISTER_USER_FAILURE', () => {
    const previousState = {
      token: null,
      userid: null,
      isAuthenticated: false,
      pending: true,
      statusText: null
    };

    const newState = {
      token: null,
      userid: null,
      isAuthenticated: false,
      pending: false,
      statusText: "Error message 1,Error message 2"
    };

    expect(auth(previousState, {
      type: types.REGISTER_USER_FAILURE,
      payload: {
        field1: ["Error message 1"],
        field2: ["Error message 2"]
      }
    })).toEqual(newState);
  });
});
