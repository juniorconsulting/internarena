import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import expect from 'expect';

import {logoutUser, loginUser, checkToken, registerUser} from '../../src/actions/index';
import {AUTH_API} from '../../src/config';
import * as types from '../../src/constants/index';

require('../helper');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('loginUser', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('creates LOGIN_USER_SUCCESS and redirect actions', () => {
    nock(AUTH_API)
      .post('/login/')
      .reply(200, {token: 'token', userid: 1});

    const expectedActions = [
      {type: types.LOGIN_USER_REQUEST},
      {type: types.LOGIN_USER_SUCCESS, payload: {token: 'token', userid: 1}},
      {type: "@@router/CALL_HISTORY_METHOD", payload: {args: ["/next"], method: "push"}}
    ];

    const store = mockStore({});

    return store.dispatch(loginUser('username', 'password', '/next'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});

describe('logoutUser', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('creates LOGOUT_USER_SUCCESS when successfully logged out', () => {
    nock(AUTH_API)
      .post('/logout/')
      .reply(200, {body: "User logged out"});

    const expectedActions = [
      {type: types.LOGOUT_USER_REQUEST},
      {type: types.LOGOUT_USER_SUCCESS},
      {type: "@@router/CALL_HISTORY_METHOD", payload: {args: ["/"], method: "push"}}
    ];

    const store = mockStore({});

    return store.dispatch(logoutUser('token'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});

describe('checkToken', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('creates LOGIN_USER_REQUEST, SUCCESS and redirects correctly', () => {
    nock(AUTH_API)
      .post('/check-token/')
      .reply(200, {userid: 1});

    const expectedActions = [
      {type: types.LOGIN_USER_REQUEST},
      {type: types.LOGIN_USER_SUCCESS, payload: {token: 'token', userid: 1}},
      {type: "@@router/CALL_HISTORY_METHOD", payload: {args: ["/next"], method: "push"}}
    ];

    const store = mockStore({});

    return store.dispatch(checkToken('token', '/next'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});

describe('registerUser', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('creates REQUEST, SUCCESS, and redirects to /confirm-email', () => {
    nock(AUTH_API)
      .post('/register/')
      .reply(200, {body: "testname"});

    const expectedActions = [
      {type: types.REGISTER_USER_REQUEST},
      {type: types.REGISTER_USER_SUCCESS},
      {type: "@@router/CALL_HISTORY_METHOD", payload: {args: ["/confirm-email"], method: "push"}}
    ];

    const store = mockStore({});

    return store.dispatch(registerUser('testname', 'test@test.com', 'password1', 'password2'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('creates FAILURE with error message', () => {
    nock(AUTH_API)
      .post('/register/')
      .reply(200, {field1: ["Error message 1"], field2: ["Error message 2"]});

    const expectedActions = [
      {type: types.REGISTER_USER_REQUEST},
      {type: types.REGISTER_USER_FAILURE, payload:
       {field1: ["Error message 1"], field2: ["Error message 2"]}}
    ];

    const store = mockStore({});

    return store.dispatch(registerUser('testname', 'test@test.com', 'password1', 'password2'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('handles HTTP status errors', () => {
    nock(AUTH_API)
      .post('/register/')
      .reply(500, "Error message");

    const expectedActions = [
      {type: types.REGISTER_USER_REQUEST},
      {type: types.REGISTER_USER_FAILURE, payload: {none: "Something went wrong!"}}
    ];

    const store = mockStore({});

    return store.dispatch(registerUser('testname', 'test@test.com', 'password1', 'password2'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
