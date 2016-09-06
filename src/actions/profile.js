import {PROFILE_API} from '../config';
import {push} from 'react-router-redux';
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

export function createProfileRequest() {
  return {
    type: types.CREATE_PROFILE_REQUEST
  };
}

export function createProfileSuccess() {
  return {
    type: types.CREATE_PROFILE_SUCCESS
  };
}

export function createProfileFailure(error) {
  return {
    type: types.CREATE_PROFILE_FAILURE,
    payload: {
      status: error.response.status,
      statusText: error.response.statusText
    }
  };
}

export function createProfile(userid, firstName, lastName) {
  return dispatch => {
    dispatch(createProfileRequest());
    return fetch(PROFILE_API + '/profiles/', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        auth_id: userid,
        first_name: firstName,
        last_name: lastName
      })
    }).then(checkStatus)
      .then(parseJSON)
      .then(camelizeProps)
      .then(json => {
        console.log(json);
        if (json.auth_id === userid) {
          dispatch(createProfileSuccess());
          dispatch(push('/confirm-email'));
        } else {
          dispatch(createProfileFailure(new Error('Wrong response from jrc-profile')));
        }
      })
      .catch(error => {
        dispatch(createProfileFailure(error));
      });
  };
}
