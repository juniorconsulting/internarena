import React from 'react';
import { Route } from 'react-router';
import { dispatch } from 'redux';

// Components
import App from './components/App';
import Home from './components/Home';
import LoginPage from './components/login/LoginPage';
import {requireAuthentication} from './components/AuthenticatedComponent';

require('styles/Main.scss')

export default (
    <div>
      <Route component={App}>
        <Route component={requireAuthentication(Home)} path="/" />	
        <Route component={LoginPage} path="/login" />
      </Route>
    </div>
);
