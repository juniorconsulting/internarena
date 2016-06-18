import React from 'react';
import AuthPage from './AuthPage';

require('../../styles/login/LoginPage.scss');

class RegisterPage extends React.Component {

  render() {
    return (
      <AuthPage next="/" />
    );
  }
}

export default RegisterPage;
