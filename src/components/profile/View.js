'use strict';

import * as actionCreators from '../../actions';
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Table, Image, Grid, Row, Col, Button, Glyphicon} from 'react-bootstrap';

let placeholderImage = require('../../images/user_placeholder.png');

class Edit extends React.Component {
  logout() {
    this.props.actions.logoutUser(this.props.token);
  }

  render() {
    return (
      <Grid className="profile-container">
        <Row id="profile-card">
          <Col md={4}>
            <Image src={
                     this.props.profile.image ?
                     this.props.profile.image :
                     placeholderImage
                   } alt="Profile Picture" responsive circle />
          </Col>
          <Col md={8}>
            <p className="firstName">{this.props.profile.firstName}</p>
            <p className="lastName">{this.props.profile.lastName}</p>
            <p className="heading title">{this.props.profile.active ? this.props.profile.title : 'Alumni'}</p>
          </Col>
        </Row>
        <Row id="projects-row">
          <Col md={12}>
            <h3 className="heading">MY PROJECTS</h3>
            <Table responsive>
              <tbody>
                <tr>
                  <td>Project 1</td>
                </tr>
                <tr>
                  <td>Project 2</td>
                </tr>
                <tr>
                  <td>Project 3</td>
                </tr>
                <tr>
                  <td>Project 4</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
        <div id="bottom-row">
          <Col md={6}>
            <Button bsStyle="primary" bsSize="large" onClick={this.props.showForm} block>EDIT PROFILE</Button>
          </Col>
          <Col md={6} id="logout-button">
            <a onClick={this.logout.bind(this)}><Glyphicon glyph="off" /></a>
          </Col>
        </div>
      </Grid>
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
