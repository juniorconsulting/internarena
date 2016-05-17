import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionCreators from '../actions/auth';

class Home extends Component {

  logout() {
    this.props.actions.logoutUser(this.props.token);
  }

  render() {
    return (
      <div>
        Homepage!
        <a href="#" onClick={this.logout.bind(this)}>Log out</a>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  token: state.auth.token
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
