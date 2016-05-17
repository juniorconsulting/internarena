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

export function getProfile(userid, token) {
  return dispatch => {
    dispatch(getProfileDataRequest());
    return fetch(PROFILE_API + '/profiles/' + userid, {
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
        json = json.data;
        if (json.url) {
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
