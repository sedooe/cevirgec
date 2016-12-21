// @flow

/* Copyright (c) 2015 Kod Gemisi Ltd.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import { Header, Icon, List, Segment } from 'semantic-ui-react';
import tr from '../utils/Translation';
//import ShortcutEditModal from './ShortcutEditModal';
import KeyCombinater from './KeyCombinater';
import '../shortcuts.scss';

export default class Shortcuts extends Component {

  state = {};

  render() {

    return (
      <DocumentTitle title={tr('Cevirgec › Settings › Shortcuts')}>
        <Segment.Group>
          <Segment>
            <Header as="h3" content={tr('Global Shortcuts')} />
          </Segment>
          <Segment color="grey" id="shortcuts">
            <List divided verticalAlign="middle">
              <List.Item>
                <List.Content floated="right">
                  <KeyCombinater shortcut={!this.props.shortcuts ? 'Loading...' : this.props.shortcuts.wordAdd} />
                  {/*<button className="ui icon button"> <i className="edit icon"></i> </button>*/}
                </List.Content>
                <Icon name="plus" />
                <List.Content>
                  <List.Header>Add new word</List.Header>
                  <List.Description>
                    {tr('Binding result: ')}
                    <Header as="h5" color="green">Successful</Header>
                  </List.Description>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Content floated="right">
                  <KeyCombinater shortcut={!this.props.shortcuts ? 'Loading...' : this.props.shortcuts.lookUp} />
                  {/*<button className="ui icon button"> <i className="edit icon"></i> </button>*/}
                </List.Content>
                <Icon name="search" />
                <List.Content>
                  <List.Header>Check for a word</List.Header>
                  <List.Description>
                    {tr('Binding result: ')}
                    <Header as="h5" color="green">Successful</Header>
                  </List.Description>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Content floated="right">
                  <KeyCombinater shortcut={!this.props.shortcuts ? 'Loading...' : this.props.shortcuts.openDashboard} />
                  {/*<button className="ui icon button"> <i className="edit icon"></i> </button>*/}
                </List.Content>
                <Icon name="dashboard"/>
                <List.Content>
                  <List.Header>Open dashboard</List.Header>
                  <List.Description>
                    {tr('Binding result: ')}
                    <Header as="h5" color="green">Successful</Header>
                  </List.Description>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Content floated="right">
                  <KeyCombinater shortcut={!this.props.shortcuts ? 'Loading...' : this.props.shortcuts.toggleVerbosity} />
                  {/*<button className="ui icon button"> <i className="edit icon"></i> </button>*/}
                </List.Content>
                <Icon name="announcement" />
                <List.Content>
                  <List.Header>Toggle verbosity</List.Header>
                  <List.Description>
                    {tr('Binding result: ')}
                    <Header as="h5" color="green">Successful</Header>
                  </List.Description>
                </List.Content>
              </List.Item>
            </List>
          </Segment>
          {/* <ShortcutEditModal key={this.state.selectedShortcutKey} name={this.state.selectedShortcutName} show={this.state.showShortcutEditModal} /> */}
        </Segment.Group>
      </DocumentTitle>
    );
  }

  openModal(shortcutKey) {
    this.setState({
      selectedShortcutKey: shortcutKey,
      selectedShortcutName: 'whatever',
      showShortcutEditModal: true
    });
  }
}
