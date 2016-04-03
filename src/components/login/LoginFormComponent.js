'use strict';

import React from 'react';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import reactMixin from 'react-mixin';
import {Button, Input, Alert} from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionCreators from '../../actions';

class LoginFormComponent extends React.Component {

  constructor(props) {
    super(props);
    console.log(props);
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
    return (
        <form>
        {this.props.statusText
         ? <Alert bsStyle="danger">{this.props.statusText}</Alert>
         : null
        }
          <Input type="text" placeholder="Brukernavn" valueLink={this.linkState('username')} />
          <Input type="password" placeholder="Passord" valueLink={this.linkState('password')} />
          <Button bsType="submit" bsStyle="danger" block disabled={this.props.isAuthenticating} onClick={this.login.bind(this)}>Logg inn</Button>
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
