import React, {Component} from 'react';
import {Glyphicon, Grid, Col, Image} from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionCreators from '../actions/auth';
import Profile from './profile/Profile';
import TimeLineComponent from './home/TimeLineComponent';

let jrcLogo = require('../images/jr_white.svg');
let placeholderImage = require('../images/user_placeholder.png');

class Home extends Component {

  constructor() {
    super();
    this.state = {
      showProfile: false
    };
  }
  toggleProfile() {
    this.setState({showProfile: !this.state.showProfile});
  }

  render() {
    return (
      <div>
        <nav id="navbar">
          <ul>
            <li className="left">
              <a><Glyphicon glyph="menu-hamburger" /></a>
            </li>
            <li>
              <Image src={jrcLogo} alt="JrC logo" responsive />
            </li>
            <li className="right">
              <a onClick={this.toggleProfile.bind(this)}>
                <Image src={
                         this.props.profile.image ?
                         this.props.profile.image :
                         placeholderImage
                       } alt="Profile Picture" responsive circle />
              </a>
            </li>
          </ul>
        </nav>
        <Grid id="main-content">
            <Col xs={12} md={12}>
              <TimeLineComponent> </TimeLineComponent>
            </Col>
        </Grid>
        <Profile hidden={!this.state.showProfile}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
