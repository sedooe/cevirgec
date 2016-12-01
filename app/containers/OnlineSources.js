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
import OnlineSourceList from '../components/OnlineSourceList';
import OnlineSourceModal from '../components/OnlineSourceModal';
import * as OnlineSourceActions from '../actions/onlineSource';
import { Button, Popup } from 'semantic-ui-react';

const sourceLangSpanStyle = {
  fontWeight: 'normal',
  marginLeft: '5px',
  fontStyle: 'oblique',
  color: '#666'
};

class OnlineSources extends Component {
  state = {
    currentOnlineSource: {},
    onlineSourceModalOpen: false
  }

  componentDidMount = () => { //see: https://twitter.com/dan_abramov/status/790581793397305345
    this.props.actions.loadOnlineSources();
  }

  openOnlineSourceModal = (onlineSource: Object) => {
    this.setState({
      onlineSourceModalOpen: true,
      currentOnlineSource: onlineSource
    });
  }

  hideOnlineSourceModal = () => {
    this.setState({
      onlineSourceModalOpen: false,
      currentOnlineSource: {}
    });
  }

  saveOnlineSource = (onlineSource: Object) => {
    this.hideOnlineSourceModal();

    if (onlineSource.id) {
      this.props.actions.editOnlineSource(onlineSource);
    } else {
      this.props.actions.createOnlineSource(onlineSource);
    }
  }

  deleteOnlineSource = (onlineSource: Object) => {
    if ( confirm( tr(`This operation cannot be undone, do you want to delete online source "${onlineSource.name}"?`), tr('Are you sure to delete?')) ) {
      this.props.actions.deleteOnlineSource(onlineSource.id);
    }
  }

  render() {
    return (
      <DocumentTitle title={tr('Cevirgec › Online Sources')}>
        <div>
          <div className="ui segments">
            <div className="ui clearing segment">
              <h3 className="ui left floated header">{tr(' Online Sources')}</h3>
              <Popup trigger={<Button primary floated="right" icon="add circle" onClick={this.openOnlineSourceModal.bind(this, {})} />} content={tr('Add new online source')} />
            </div>

            <div className="ui grey segment">
              <OnlineSourceList
                onlineSources={this.props.onlineSources}
                onEdit={this.openOnlineSourceModal}
                onDelete={this.deleteOnlineSource}
              />
            </div>
          </div>

          <OnlineSourceModal
            open={this.state.onlineSourceModalOpen}
            onHide={this.hideOnlineSourceModal}
            onSave={this.saveOnlineSource}
            onDelete={this.deleteOnlineSource}
            onlineSource={this.state.currentOnlineSource}
          />
        </div>
      </DocumentTitle>
    );
  }
}


const mapStateToProps = state => ({
  onlineSources: state.onlineSources
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(OnlineSourceActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(OnlineSources);
