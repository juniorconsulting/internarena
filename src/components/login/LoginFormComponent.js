'use strict';

import React from 'react';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import reactMixin from 'react-mixin';
import {ButtonInput, Input, Alert, Glyphicon} from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionCreators from '../../actions';

class LoginFormComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      redirectTo: props.next
    };
  }

  login(e) {
    e.preventDefault();
    this.props.actions.loginUser(this.state.username, this.state.password, this.state.redirectTo);
  }

  render() {
    const innerUserIcon = <Glyphicon bsClass="glyphicon usericon" glyph="user" />;
    const innerLockIcon = <Glyphicon bsClass="glyphicon lockicon" glyph="lock" />;
    return (
        <form className="login-form" onSubmit={this.login.bind(this)}>
        {this.props.statusText
         ? <Alert bsStyle="danger">{this.props.statusText}</Alert>
         : null
        }
          <Input type="text" placeholder="Brukernavn" className="username" valueLink={this.linkState('username')} addonBefore={innerUserIcon} />
        <Input type="password" placeholder="Passord" className="password" valueLink={this.linkState('password')} addonBefore={innerLockIcon} />
          <ButtonInput type="submit" className="form-control" bsStyle="danger" block disabled={this.props.isAuthenticating} value="Logg inn" />
        </form>
    );
  }
}

reactMixin(LoginFormComponent.prototype, LinkedStateMixin);

const mapStateToProps = (state) => ({
  isAuthenticating: state.auth.isAuthenticating,
  statusText: state.auth.statusText
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginFormComponent);
