import React from 'react';
import {Route, IndexRoute} from 'react-router';

// Components
import App from './components/App';
import Home from './components/Home';
import LoginPage from './components/auth/LoginPage';
import RegisterPage from './components/auth/RegisterPage.js';
import ConfirmEmailPage from './components/auth/ConfirmEmailPage';
import {requireAuthentication} from './components/AuthenticatedComponent';

require('./styles/Main.scss');

export default (
  <div>
    <Route component={App} path="/">
      <IndexRoute component={requireAuthentication(Home)}/>
    </Route>
    <Route component={LoginPage} path="/login" />
    <Route component={RegisterPage} path="/register" />
    <Route component={ConfirmEmailPage} path="/confirm-email" />
  </div>
);
