import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import expect from 'expect';

import {PROFILE_API} from '../../src/config';
import {getProfile, createProfile} from '../../src/actions/profile';
import * as types from '../../src/constants/index';

require('../helper');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('getProfile', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('sends request and success actions', () => {
    const sampleData = {
      url: "http://profile.jrc.no/profiles/1/",
      authId: 1,
      firstName: "Firstname",
      lastName: "Lastname",
      phoneNr: "12345678",
      bioText: "Bio text",
      funFact: "Fun fact",
      active: true
    };
    nock(PROFILE_API)
      .get('/profiles/1/') // jrc-auth userid
      .reply(200, sampleData);

    const expectedActions = [
      {type: types.PROFILE_DATA_REQUEST},
      {type: types.PROFILE_DATA_SUCCESS, payload: sampleData}
    ];

    const store = mockStore({});

    return store.dispatch(getProfile(1, 'token'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});

describe('createProfile', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('creates REQUEST and SUCCESS', () => {
    nock(PROFILE_API)
      .post('/profiles/')
      .reply(200, {profileId: 1});

    const expectedActions = [
      {type: types.CREATE_PROFILE_REQUEST},
      {type: types.CREATE_PROFILE_SUCCESS},
      {type: "@@router/CALL_HISTORY_METHOD", payload: {args: ["/confirm-email"], method: "push"}}
    ];

    const store = mockStore({});

    return store.dispatch(createProfile(1, 'firstName', 'lastName'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
