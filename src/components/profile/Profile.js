'use strict';

import React from 'react';
// import {bindActionCreators} from 'redux';
// import {connect} from 'react-redux';
// import * as profileActionCreators from '../../actions/profile';

require('../../styles/profile/style.scss');

class Profile extends React.Component {
  render() {
    if (this.props.hidden) {
      return null;
    }
    return (
      <div id="profile-container">Profile</div>
    );
  }
}

export default Profile;
