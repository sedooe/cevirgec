// @flow
import React, { Component, PropTypes } from 'react';
import Breadcrumbs from 'react-breadcrumbs';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  };

  //this div will have id="data-reactroot"
  render() {
    return (
      <main className='full-height'>

        {(
          this.props.location.pathname == "/" ?
          null :
          <Breadcrumbs
            routes={this.props.routes}
            params={this.props.params}
          />
        )}

        {this.props.children}
      </main>
    );
  }
}
