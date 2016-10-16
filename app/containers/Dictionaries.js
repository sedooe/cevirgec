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
import DictionaryList from '../components/DictionaryList';
import DictionaryModal from '../components/DictionaryModal';
import { Button, List, Popup } from 'semantic-ui-react';

export default class Dashboard extends Component {

  state = {
    dictionaries: {
      1: {
        id: 1,
        name: "deneme",
        sourceLanguage: "af",
        targetLanguage: "tr",
        context: "sport",
        numberOfDefinitions: "9",
        active: true
      },
      2: {
        id: 2,
        name: "sozluk",
        sourceLanguage: "za",
        targetLanguage: "tr",
        context: "technology",
        numberOfDefinitions: "90",
        active: true
      }
    },
    currentDictionary: {},
    dictionaryModalOpen: false
  }

  openDictionaryModal(dictionary) {
    this.setState({
      dictionaryModalOpen: true,
      currentDictionary: dictionary
    });
  }

  hideDictionaryModal() {
    this.setState({
      dictionaryModalOpen: false,
      currentDictionary: {}
    });
  }

  render() {
    return (
      <DocumentTitle title={tr('Cevirgec › Dictionaries')}>
        <div>
          <div className="ui segments">
            <div className="ui clearing segment">
              <h3 className="ui left floated header">{tr('Dictionaries')}</h3>
              <Popup trigger={<Button primary floated='right' icon='add circle' onClick={this.openDictionaryModal.bind(this, {})} />} content={tr('Add new dictionary')}/>
            </div>

            <div className="ui grey segment">
              <DictionaryList dictionaries={this.state.dictionaries} onEdit={this.openDictionaryModal.bind(this)} />
            </div>
          </div>

          <DictionaryModal open={this.state.dictionaryModalOpen} onHide={this.hideDictionaryModal.bind(this)} dictionary={this.state.currentDictionary}/>
        </div>
      </DocumentTitle>
    );
  }
}
