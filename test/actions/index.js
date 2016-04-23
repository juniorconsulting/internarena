import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import expect from 'expect';

import {logoutUser} from '../../src/actions/index';
import {AUTH_API} from '../../src/config';
import * as types from '../../src/constants/index';

require('../helper');
require('isomorphic-fetch');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('logoutUser', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('creates LOGOUT_USER_SUCCESS when successfully logged out', () => {
    nock(AUTH_API)
      .post('/logout')
      .reply(200, {body: "User logged out"});

    const expectedActions = [
      {type: types.LOGOUT_USER_REQUEST},
      {type: types.LOGOUT_USER_SUCCESS},
      {type: "@@reduxReactRouter/historyAPI", payload: {args: ["/"], method: "push"}}
    ];

    const store = mockStore({});

    return store.dispatch(logoutUser('token'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
