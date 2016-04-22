import React, {Component} from 'react';
import {connect} from 'react-redux';

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

export default connect(() => {
  return {};
})(App);
