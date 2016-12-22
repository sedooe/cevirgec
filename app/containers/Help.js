/* Copyright (c) 2015 Kod Gemisi Ltd.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DocumentTitle from 'react-document-title';
import tr from '../utils/Translation';
import { Button, Segment } from 'semantic-ui-react';

class Help extends Component {

  render() {
    return (
      <DocumentTitle title={tr('Cevirgec › Help')}>
        <Segment className='main-flex-container'>
          <div>Help</div>
        </Segment>
      </DocumentTitle>
    );
}
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Help);
