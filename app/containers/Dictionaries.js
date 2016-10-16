/* Copyright (c) 2015 Kod Gemisi Ltd.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';

import React, {Component} from 'react';
import DocumentTitle from 'react-document-title';
import { Link } from 'react-router';
import tr from '../utils/Translation';
import './Dashboard.scss';
import { List } from 'semantic-ui-react';

export default class Dashboard extends Component {

  state = {
    dictionaries: {}
  }

  render() {

          return (
            <DocumentTitle title={tr('Cevirgec › Dictionaries')}>
              <div className="ui segments">
                <div className="ui clearing segment">
                  <h3 className="ui left floated header">{tr('Dictionaries')}</h3>
                  <button className="ui icon primary button right floated" data-content={tr('Add new')}>
                    <i className="add circle icon"></i>
                  </button>
                </div>

                <div className="ui grey segment">
                  <List divided relaxed>
                    <List.Item>
                      <List.Icon name='github' size='large' verticalAlign='middle' />
                      <List.Content>
                        <List.Header as='a'>Semantic-Org/Semantic-UI</List.Header>
                        <List.Description as='a'>Updated 10 mins ago</List.Description>
                      </List.Content>
                    </List.Item>
                    <List.Item>
                      <List.Icon name='github' size='large' verticalAlign='middle' />
                      <List.Content>
                        <List.Header as='a'>Semantic-Org/Semantic-UI-Docs</List.Header>
                        <List.Description as='a'>Updated 22 mins ago</List.Description>
                      </List.Content>
                    </List.Item>
                    <List.Item>
                      <List.Icon name='github' size='large' verticalAlign='middle' />
                      <List.Content>
                        <List.Header as='a'>Semantic-Org/Semantic-UI-Meteor</List.Header>
                        <List.Description as='a'>Updated 34 mins ago</List.Description>
                      </List.Content>
                    </List.Item>
                  </List>
                </div>
              </div>
            </DocumentTitle>
    );
  }
}
