'use strict';

import * as actionCreators from '../../actions';
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Button} from 'react-bootstrap';

class Edit extends React.Component {
  logout() {
    this.props.actions.logoutUser(this.props.token);
  }

  render() {
    return (
      <div className="profile-container" id="edit-profile-form">
        <h2 className="heading">INFO</h2>
        <form>
          <div className="toggle-container">
            <p>Active</p>
            <div className="switch">
              <input id="active-toggle" className="toggle" type="checkbox" />
              <label htmlFor="active-toggle"></label>
            </div>
            <p>Alumni</p>
          </div>
        </form>
        <Button bsStyle="primary" bsSize="large" onClick={this.props.hideForm}>SAVE</Button>
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
