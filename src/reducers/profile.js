import {createReducer} from '../util/reducers';
import * as types from '../constants';

export const initialState = {
  firstName: null,
  lastName: null,
  phoneNr: null,
  bioText: null,
  funFact: null,
  active: null,
  loading: false
};

export default createReducer(initialState, {
  [types.PROFILE_DATA_REQUEST]: state => {
    return Object.assign({}, state, {
      loading: true
    });
  },
  [types.PROFILE_DATA_SUCCESS]: (state, payload) => {
    return Object.assign({}, state, {
      firstName: payload.firstName,
      lastName: payload.lastName,
      phoneNr: payload.phoneNr,
      bioText: payload.bioText,
      funFact: payload.funFact,
      active: payload.active,
      loading: false
    });
  },
  [types.PROFILE_DATA_FAILURE]: () => {
    return initialState;
  }
});
