import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router';

class App extends Component {
    render() {
        return (
            <div>
              <Link to="/">Home</Link>
              <Link to="/about">About</Link>
              <Link to="/login">Login</Link>
              {this.props.children}
            </div>
        );
    }
}

export default connect((state) => {
	return {};
})(App);
