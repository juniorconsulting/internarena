'use strict';

import React from 'react';

export class ActiveButton extends React.Component {

  constructor() {
    super();

    this.state = {
      isChecked: true
    };
  }

  toggleChange() {
    this.setState({
      isChecked: !this.state.isChecked
    }, function() {
      console.log(this.state);
    });
  }

  render() {
    return (
      <div>
        <span>Aktiv </span>
        <input id="checkbox-active" name="active" className="cmn-toggle cmn-toggle-round"
               type="checkbox"
               checked={this.state.isChecked}
               onChange={this.toggleChange.bind(this)} />
        <label htmlFor="checkbox-active">s</label>
        <span> Alumni</span>
      </div>
    );
  }
}
