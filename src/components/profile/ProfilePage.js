'use strict';

import React from 'react';
// import {bindActionCreators} from 'redux';
// import {connect} from 'react-redux';
// import * as profileActionCreators from '../../actions/profile';

class ProfilePage extends React.Component {
  render() {
    return (<p>This is profile {this.props.params.authId}</p>);
  }
}

export default ProfilePage;
