'use strict';

import * as actionCreators from '../../actions';
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Image, Grid, Row, Col, Button, Glyphicon} from 'react-bootstrap';

let placeholderImage = require('../../images/user_placeholder.png');

class Edit extends React.Component {
  logout() {
    this.props.actions.logoutUser(this.props.token);
  }

  render() {
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
              <Button bsStyle="primary" bsSize="large" onClick={this.props.showForm} block>EDIT PROFILE</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
