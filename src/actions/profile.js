import {PROFILE_API} from '../config';
import {checkStatus, parseJSON, camelizeProps} from '../util/http';
import * as types from '../constants';

require('isomorphic-fetch');

export function getProfileDataRequest() {
  return {
    type: types.PROFILE_DATA_REQUEST
  };
}

export function getProfileDataSuccess(payload) {
  return {
    type: types.PROFILE_DATA_SUCCESS,
    payload: payload
  };
}

export function getProfileDataFailure(error) {
  return {
    type: types.PROFILE_DATA_FAILURE,
    payload: {
      status: error.response.status,
      statusText: error.response.statusText
    }
  };
}

export function updateProfileRequest() {
  return {
    type: types.UPDATE_PROFILE_REQUEST
  };
}

export function updateProfileSuccess(payload) {
  return {
    type: types.UPDATE_PROFILE_SUCCESS,
    payload: payload
  };
}

export function updateProfileFailure(error) {
  return {
    type: types.PROFILE_DATA_FAILURE,
    payload: {
      status: error.response.status,
      statusText: error.response.statusText
    }
  };
}

export function getProfile(userid, token) {
  return dispatch => {
    dispatch(getProfileDataRequest());
    return fetch(PROFILE_API + '/profiles/' + userid + '/', {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'auth-token': token
      }
    }).then(checkStatus)
      .then(parseJSON)
      .then(camelizeProps)
      .then(json => {
        if (json.firstName) {
          dispatch(getProfileDataSuccess(json));
        } else {
          dispatch(getProfileDataFailure(new Error('Something went wrong.')));
        }
      })
      .catch(error => {
        dispatch(getProfileDataFailure(error));
      });
  };
}

export function updateProfile(profile, token, authId) {

  console.log(profile);

  return dispatch => {
    dispatch(updateProfileRequest());

    return fetch(PROFILE_API + '/profiles/' + authId + '/', {
      method: 'put',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'auth-token': token
      },
      body: JSON.stringify({
        auth_id: parseInt(authId),
        first_name: profile.firstName,
        last_name: profile.lastName,
        phone_nr: profile.phoneNr,
        bio_text: profile.bioText,
        fun_fact: profile.funFact,
        active: true,
        title: profile.title,
      })
    }).then(checkStatus)
      .then(parseJSON)
      .then(json => {
        dispatch(updateProfileSuccess(json));
      })
      .catch(error => {
        dispatch(updateProfileFailure(error));
      });
  };
}
