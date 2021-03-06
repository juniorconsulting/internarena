import * as types from '../constants';
import {push} from 'react-router-redux';
import {checkStatus, parseJSON, isHTTPError} from '../util/http';
import {AUTH_API} from '../config';
import {createProfile} from './profile';

require('isomorphic-fetch');

export function loginUserRequest() {
  return {
    type: types.LOGIN_USER_REQUEST
  };
}

export function loginUserSuccess(token, userid) {
  localStorage.setItem('token', token);
  localStorage.setItem('userid', userid);
  return {
    type: types.LOGIN_USER_SUCCESS,
    payload: {
      token: token,
      userid: userid
    }
  };
}

export function loginUserFailure(error) {
  localStorage.removeItem('token');
  localStorage.removeItem('userid');
  return {
    type: types.LOGIN_USER_FAILURE,
    payload: {
      status: error.response.status,
      statusText: error.response.statusText
    }
  };
}

export function logoutUserRequest() {
  return {
    type: types.LOGOUT_USER_REQUEST
  };
}

export function logoutUserSuccess() {
  localStorage.removeItem('token');
  localStorage.removeItem('userid');
  return {
    type: types.LOGOUT_USER_SUCCESS
  };
}

export function logoutUserFailure(error) {
  return {
    type: types.LOGOUT_USER_FAILURE,
    payload: {
      status: error.response.status,
      statusText: error.response.statusText
    }
  };
}

export function gotoRegisterPage() {
  return function(dispatch) {
    dispatch(push('/register'));
  };
}

export function registerUserRequest() {
  return {
    type: types.REGISTER_USER_REQUEST
  };
}

export function registerUserSuccess() {
  return {
    type: types.REGISTER_USER_SUCCESS
  };
}

export function registerUserFailure(error) {
  if (isHTTPError(error)) {
    return {
      type: types.REGISTER_USER_FAILURE,
      payload: {
        none: "Something went wrong!"
      }
    };
  }
  return {
    type: types.REGISTER_USER_FAILURE,
    payload: error
  };
}

export function checkToken(token, redirect = "/") {
  return function(dispatch) {
    dispatch(loginUserRequest());
    return fetch(AUTH_API + '/check-token/', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({token: token})
    }).then(checkStatus)
      .then(parseJSON)
      .then(json => {
        if (json.userid) {
          dispatch(loginUserSuccess(token, json.userid));
          dispatch(push(redirect));
        } else {
          dispatch(loginUserFailure());
          dispatch(push('/login'));
        }
      })
      .catch(error => {
        dispatch(loginUserFailure(error));
        dispatch(push('/login'));
      });
  };
}

export function loginUser(username, password, redirect = "/") {
  return function(dispatch) {
    dispatch(loginUserRequest());
    return fetch(AUTH_API + '/login/', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username: username, password: password})
    }).then(checkStatus)
      .then(parseJSON)
      .then(json => {
        // Check token
        if (json.token) {
          dispatch(loginUserSuccess(json.token, json.userid));
          dispatch(push(redirect));
        } else {
          dispatch(loginUserFailure({response: {status: 403, statusText: json}}));
        }
      }).catch(error => {
        dispatch(loginUserFailure(error));
      });
  };
}

export function logoutUser(token) {
  return dispatch => {
    dispatch(logoutUserRequest());
    return fetch(AUTH_API + '/logout/', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({token: token})
    }).then(checkStatus)
      .then(parseJSON)
      .then(json => {
        if (json.message !== 'User logged out.') {
          dispatch(logoutUserFailure({response: {status: 403, statusText: json.body}}));
          return;
        }
        dispatch(logoutUserSuccess());
        dispatch(push('/'));
      })
      .catch(ex => {
        dispatch(logoutUserFailure(ex));
      });
  };
}

export function registerUser(username, email, password1, password2, firstName, lastName) {
  return dispatch => {
    dispatch(registerUserRequest());
    return fetch(AUTH_API + '/register/', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username, email, password1, password2})
    }).then(checkStatus)
      .then(parseJSON)
      .then(json => {
        if (json.username !== username) {
          dispatch(registerUserFailure(json));
          return;
        }
        dispatch(registerUserSuccess());
        let userId = json.userid;
        dispatch(createProfile(userId, firstName, lastName));
      })
      .catch(ex => {
        dispatch(registerUserFailure(ex));
      });
  };
}
