// @flow
import React, { Component, PropTypes } from 'react';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  };

  //this div will have id="data-reactroot"
  render() {
    return (
      <main>
        {this.props.children}
      </main>
    );
  }
}
