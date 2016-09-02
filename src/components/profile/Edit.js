'use strict';

import * as actionCreators from '../../actions';
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Button, Input} from 'react-bootstrap';
import {ActiveButton} from "../../components/profile/ActiveButton";

class Edit extends React.Component {

  handleChange(e) {
    console.log(e.target.value)
  }

  onSave(e) {

    console.log(this.props.profile);

    this.props.actions.updateProfile(this.props.profile, this.props.token, this.props.authId);
    this.props.hideForm();
  }

  render() {
    return (
      <div className="profile-container" id="edit-profile-form">
        <h2 className="heading">INFO</h2>
        <form>
          <Input
             type="text"
             onChange={this.handleChange.bind(this, 'firstName')}
             defaultValue={this.props.profile.firstName} />
          <Input
             type="text"
             onChange={this.handleChange}
             defaultValue={this.props.profile.lastName} />
          <select defaultValue={this.props.profile.title} onChange={this.handleChange}>
            <option value="CONSULTANT">Consultant</option>
            <option value="PARTNER">Partner</option>
          </select>

          <div className="jrc-toggle text-center">
            <ActiveButton />
          </div>
        </form>
        <Button bsStyle="primary" bsSize="large" onClick={this.onSave.bind(this)}>SAVE</Button>
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
