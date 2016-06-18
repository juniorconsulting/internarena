'use strict';

import React from 'react';
import {ButtonInput, Input, Alert, Glyphicon} from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as authActionCreators from '../../actions/auth';

class LoginFormComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      redirectTo: props.next
    };
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleUsernameChange(e) {
    this.setState({username: e.target.value});
  }

  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }

  login(e) {
    e.preventDefault();
    this.props.actions.loginUser(this.state.username, this.state.password, this.state.redirectTo);
  }

  render() {
    const innerUserIcon = <Glyphicon bsClass="glyphicon usericon" glyph="user" />;
    const innerLockIcon = <Glyphicon bsClass="glyphicon lockicon" glyph="lock" />;
    return (
      <form onSubmit={this.login.bind(this)}>
        {this.props.statusText ?
          <Alert bsStyle="danger">{this.props.statusText}</Alert> :
            null
          }
          <Input
             type="text"
             placeholder="Username"
             className="username"
             value={this.state.username}
             onChange={this.handleUsernameChange}
             addonBefore={innerUserIcon} />
          <Input
             type="password"
             placeholder="Password"
             className="password"
             value={this.state.password}
             onChange={this.handlePasswordChange}
             addonBefore={innerLockIcon} />
          <ButtonInput
             type="submit"
             className="form-control"
             bsStyle="danger"
             disabled={this.props.isAuthenticating}
             value="Log in" block/>
          <ButtonInput
             onClick={this.props.actions.gotoRegisterPage}
             className="form-control"
             bsStyle="success"
             value="Register"
             block />
      </form>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticating: state.auth.isAuthenticating,
  statusText: state.auth.statusText
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(authActionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginFormComponent);
