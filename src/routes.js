import React from 'react';
import { Route } from 'react-router';
import { dispatch } from 'redux';

// Container
import App from './containers/app';

// Components
import Home from './components/Home';
import About from './components/About';
import LoginPage from './components/login/LoginPage';
import {requireAuthentication} from './components/AuthenticatedComponent';

require('styles/Main.scss')

export default (
    <div>
      <Route component={App}>
        <Route component={requireAuthentication(Home)} path="/" />	
        <Route component={About} path="/about" />	
        <Route component={LoginPage} path="/login" />
      </Route>
    </div>
);
