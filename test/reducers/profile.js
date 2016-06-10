import expect from 'expect';

import profile from '../../src/reducers/profile';
import * as types from '../../src/constants/';
/*
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
 */

describe('Profile reducer', () => {
  it('has clean initial state', () => {
    const expectedState = {
      firstName: null,
      lastName: null,
      phoneNr: null,
      bioText: null,
      funFact: null,
      active: null,
      title: null,
      image: null,
      loading: false
    };

    expect(profile(undefined, {})).toEqual(expectedState);
  });

  it('sets loading to true on PROFILE_DATA_REQUEST', () => {
    const expectedState = {
      firstName: null,
      lastName: null,
      phoneNr: null,
      bioText: null,
      funFact: null,
      active: null,
      title: null,
      image: null,
      loading: true
    };

    expect(profile(undefined, {type: types.PROFILE_DATA_REQUEST})).toEqual(expectedState);
  });

  it('sets loading to false, stores data on PROFILE_DATA_SUCCCESS', () => {
    const originalState = {
      firstName: null,
      lastName: null,
      phoneNr: null,
      bioText: null,
      funFact: null,
      active: null,
      title: null,
      image: null,
      loading: true
    };
    const expectedState = {
      firstName: 'Firstname',
      lastName: 'Lastname',
      phoneNr: '12345678',
      bioText: 'Bio',
      funFact: 'Fun fact',
      active: true,
      title: 'Consultant',
      image: 'http://example.com/image.png',
      loading: false
    };
    const payload = {
      firstName: 'Firstname',
      lastName: 'Lastname',
      phoneNr: '12345678',
      bioText: 'Bio',
      funFact: 'Fun fact',
      active: true,
      title: 'Consultant',
      image: 'http://example.com/image.png'
    };

    expect(profile(originalState, {type: types.PROFILE_DATA_SUCCESS, payload: payload})).toEqual(expectedState);
  });

  it('sets loading to false and clears data on PROFILE_DATA_FAILURE', () => {
    const originalState = {
      firstName: 'Something',
      lastName: 'Other',
      phoneNr: '12345678',
      bioText: 'Bio',
      funFact: 'Fun fact',
      active: true,
      title: 'Consultant',
      image: 'http://example.com/image.png',
      loading: false
    };
    const expectedState = {
      firstName: null,
      lastName: null,
      phoneNr: null,
      bioText: null,
      funFact: null,
      active: null,
      title: null,
      image: null,
      loading: false
    };

    expect(profile(originalState, {type: types.PROFILE_DATA_FAILURE, payload: {error: "Error"}}))
      .toEqual(expectedState);
  });
});
