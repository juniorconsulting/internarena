import React from 'react';
import AuthPage from './AuthPage';
import RegisterFormComponent from './RegisterFormComponent';
require('../../styles/login/AuthPage.scss');

class RegisterPage extends React.Component {

  render() {
    return (
      <AuthPage form={RegisterFormComponent} next="/" />
    );
  }
}

export default RegisterPage;
