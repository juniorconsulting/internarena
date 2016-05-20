'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {Image, Grid, Row, Col, Button, Glyphicon} from 'react-bootstrap';
import * as actionCreators from '../../actions';
import {bindActionCreators} from 'redux';

require('../../styles/profile/style.scss');
let placeholderImage = require('../../images/user_placeholder.png');

class Profile extends React.Component {
  logout() {
    this.props.actions.logoutUser(this.props.token);
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
    return (
      <div id="profile-container">
        <Image src={
                 this.props.profile.image ?
                 this.props.profile.image :
                 placeholderImage
               } alt="Profile Picture" responsive circle />
        <p className="firstName">{this.props.profile.firstName}</p>
        <p className="lastName">{this.props.profile.lastName}</p>
        <p className="title">{this.props.profile.active ? this.props.profile.title : 'Alumni'}</p>
        <Grid>
          <Row>
            <Col md={6}>
              <Button bsStyle="primary" bsSize="large" block>Rediger Profil</Button>
            </Col>
            <Col md={6}>
              <a onClick={this.logout.bind(this)}><Glyphicon glyph="off" /></a>
            </Col>
          </Row>
        </Grid>
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
