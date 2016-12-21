/* Copyright (c) 2015 Kod Gemisi Ltd.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

// @flow
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DocumentTitle from 'react-document-title';
import tr from '../utils/Translation';
import DictionaryList from '../components/DictionaryList';
import DictionaryModal from '../components/DictionaryModal';
import * as DictionaryActions from '../actions/dictionary';
import { Button, Popup } from 'semantic-ui-react';

class Dictionaries extends Component {

  static propTypes = {
    dictionaries: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  }

  state = {
    currentDictionary: {},
    dictionaryModalOpen: false
  }

  componentDidMount = () => { //see: https://twitter.com/dan_abramov/status/790581793397305345
    this.props.actions.loadDictionaries();
  }

  openDictionaryModal = (dictionary: Object) => {
    this.setState({
      dictionaryModalOpen: true,
      currentDictionary: dictionary
    });
  }

  hideDictionaryModal = () => {
    this.setState({
      dictionaryModalOpen: false,
      currentDictionary: {}
    });
  }

  saveDictionary = dictionary => {
    this.hideDictionaryModal();

    if (dictionary.id) {
      this.props.actions.editDictionary(dictionary);
    } else {
      this.props.actions.createDictionary(dictionary);
    }
  }

  deleteDictionary = dictionary => {
    if (confirm(`Are you sure to delete dictionary "${dictionary.name}"?`)) {
      this.props.actions.deleteDictionary(dictionary.id);
    }
  }

  handleCheckboxToggle = dictionaryId => {
    this.props.actions.changeActivenessOfDictionary(dictionaryId);
  }

  render() {
    return (
      <DocumentTitle title={tr('Cevirgec › Dictionaries')}>
        <div className='main-flex-container'>
          <div className="ui segments">
            <div className="ui clearing segment">
              <h3 className="ui left floated header">{tr('Dictionaries')}</h3>
              <Popup trigger={<Button primary floated="right" icon="add circle" onClick={this.openDictionaryModal.bind(this, {})} />} content={tr('Add new dictionary')} />
            </div>

            <div className="ui grey segment">
              <DictionaryList
                dictionaries={this.props.dictionaries}
                onEdit={this.openDictionaryModal}
                onDelete={this.deleteDictionary}
                onCheckboxToggle={this.handleCheckboxToggle}
              />
            </div>
          </div>

          <DictionaryModal
            open={this.state.dictionaryModalOpen}
            onHide={this.hideDictionaryModal}
            onSave={this.saveDictionary}
            dictionary={this.state.currentDictionary}
          />
        </div>
      </DocumentTitle>
    );
  }
}

const mapStateToProps = state => ({
  dictionaries: state.dictionary.dictionaries
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(DictionaryActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Dictionaries)
