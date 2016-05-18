import React, {Component} from 'react';
import {Link} from 'react-router';
import {Grid, Col, Row} from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionCreators from '../actions/auth';

let jrcLogo = require('../images/jr_white.svg');

class Home extends Component {

  logout() {
    this.props.actions.logoutUser(this.props.token);
  }

  render() {
    return (
      <div>
        <nav id="navbar">
          <ul>
            <li className="left">
              <a href="#" onClick={this.logout.bind(this)}>LOG OUT</a>
            </li>
            <li>
              <img src={jrcLogo} alt="JrC logo" className="img-responsive" />
            </li>
            <li className="right">
              <Link to={`/profile/${this.props.authId}`}>PROFILE</Link>
            </li>
          </ul>
        </nav>
        <Grid id="main-content">
          <Row className="show-grid">
            <Col xs={12} md={8}><code>&lt;{'Col xs={12} md={8}'} /&gt;</code></Col>
            <Col xs={6} md={4}><code>&lt;{'Col xs={6} md={4}'} /&gt;</code></Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  token: state.auth.token,
  authId: state.auth.userid
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
