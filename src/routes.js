import React from 'react';
import {Route} from 'react-router';

// Components
import App from './components/App';
import Home from './components/Home';
import LoginPage from './components/auth/LoginPage';
import {requireAuthentication} from './components/AuthenticatedComponent';

require('./styles/Main.scss');

export default (
  <div>
    <Route component={App}>
      <Route component={requireAuthentication(Home)} path="/" />
      <Route component={LoginPage} path="/login" />
    </Route>
  </div>
);
