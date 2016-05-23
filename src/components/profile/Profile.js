'use strict';

import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../../actions';
import {bindActionCreators} from 'redux';
import View from './View';
import Edit from './Edit';

require('../../styles/profile/style.scss');

class Profile extends React.Component {

  constructor() {
    super();
    this.state = {
      showForm: false
    };
  }

  showForm() {
    this.setState({showForm: true});
  }

  hideForm() {
    this.setState({showForm: false});
  }

  componentWillMount() {
    if (this.props.profile.firstName === null) {
      this.props.actions.getProfile(this.props.authId, this.props.token);
    }
  }

  render() {
    if (this.props.hidden) {
      return null;
    }
    let component = this.state.showForm ?
          <Edit hideForm={this.hideForm.bind(this)} /> :
          <View showForm={this.showForm.bind(this)} />;
    return (
      <div>
        {component}
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
