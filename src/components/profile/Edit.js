'use strict';

import * as actionCreators from '../../actions';
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {FormControl} from 'react-bootstrap';

class Edit extends React.Component {
  logout() {
    this.props.actions.logoutUser(this.props.token);
  }

  render() {
    return (
      <div id="profile-container">
        <h1>Info</h1>
        <form>
          <FormControl>
          </FormControl>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  token: state.auth.token,
  authId: state.auth.userid,
  profile: state.profile
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
