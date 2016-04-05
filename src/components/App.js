import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router';

require('../styles/Main.scss');

class App extends Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default connect((state) => {
  return {};
})(App);
