import React from 'react';
import LoginFormComponent from './LoginFormComponent';
import AuthPage from './AuthPage';

class LoginPage extends React.Component {

  render() {
    return (
      <AuthPage form={LoginFormComponent} next={this.props.location.query.next || '/'} />
    );
  }
}

export default LoginPage;
