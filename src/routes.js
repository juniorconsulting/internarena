import React from 'react';
import {Route, IndexRoute} from 'react-router';

// Components
import App from './components/App';
import Home from './components/Home';
import LoginPage from './components/auth/LoginPage';
import RegisterPage from './components/auth/RegisterPage.js';
import {requireAuthentication} from './components/AuthenticatedComponent';

require('./styles/Main.scss');

export default (
  <div>
    <Route component={App} path="/">
      <IndexRoute component={requireAuthentication(Home)}/>
    </Route>
    <Route component={LoginPage} path="/login" />
    <Route component={RegisterPage} path="/register" />
  </div>
);
