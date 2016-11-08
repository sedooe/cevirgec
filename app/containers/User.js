/* Copyright (c) 2016 Kod Gemisi Ltd.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

// @flow
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DocumentTitle from 'react-document-title';


class User extends Component {

  render() {
    let childrenWithProps = React.Children.map(this.props.children, child => (
      React.cloneElement(child, this.props[child.type.name])
    ));

    return(
      <div style={{marginTop: '1rem', height: 'calc(100% - 25px)'}}>
        {childrenWithProps}
      </div>
    );
  }
}

export default User