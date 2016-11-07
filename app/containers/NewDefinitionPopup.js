 /* Copyright (c) 2015 Kod Gemisi Ltd.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';

import React, {Component} from 'react';
// import {Container} from 'flux/utils';
// import newDefinitionStore, {Events} from '../stores/NewDefinitionStore';
// import UiEvents from '../events/UiEvents';
// import AppDispatcher, {dispatch} from '../dispatchers/AppDispatcher';
import tr from '../utils/Translation';
import debug from 'debug';
// import ActiveDictionaries from '../components/newDefinition/ActiveDictionaries';
// import DefinitionForm from '../components/newDefinition/DefinitionForm';
// import Accordion from '../components/semanticui/Accordion';
// import Tab from '../components/semanticui/Tab';
// import IframeBrowser from '../components/newDefinition/IframeBrowser';
// import OnlineSourceModal from '../components/OnlineSourceModal';
const logger = debug('NewDefinitionPopup');
const wordUtils = require('../../backend/WordUtils');

const newDefinitionAsteriskStyle = {
  'font-size': '0.7em',
  'color': 'gray',
  'line-height': '10px',
  'vertical-align': 'top'
};
const noMeanintTextStyle = {
  'display': 'inline',
  'fontWeight': 'lighter',
  'fontStyle': 'italic'
}

export default class NewDefinitionWindow extends Component {

  constructor() {
    super();
    this.addMeaning = this.addMeaning.bind(this);
    this.save = this.save.bind(this);
    this.onActiveDictionariesClearAll = this.onActiveDictionariesClearAll.bind(this);
    this.onActiveDictionariesSelectAll = this.onActiveDictionariesSelectAll.bind(this);
    this.onActiveDictionariesChanged = this.onActiveDictionariesChanged.bind(this);
    this.onActiveIndexChangedHandler = this.onActiveIndexChangedHandler.bind(this);

    // at least one meaning form must be present
    this.addMeaning();
  }

  static getStores() {
    return [newDefinitionStore];
  }

  static calculateState(prevState) {

    logger('calculateState', newDefinitionStore.getDictionaries());

    return {
      definitions: newDefinitionStore.getDefinitions(),
      dictionaries: newDefinitionStore.getDictionaries(),
      activeDictionaryIds: newDefinitionStore.getActiveDictionaryIds(),
      currentWord: newDefinitionStore.getCurrentWord(),
      onlineSources: newDefinitionStore.getOnlineSources(),
      activeDefinitionIndex: newDefinitionStore.getActiveDefinitionIndex(),
      comingFromDictionariesPage: newDefinitionStore.getComingFromDictionariesPage()
    }
  }

  componentDidMount() {
    // dispatch({
    //   type: Events.FIRST_LOAD
    // });
    //
    // dispatch({
    //   type: UiEvents.LOAD_DICTIONARIES
    // });
  }

  showDictionaryModal() {
    let onlineSource = {};

    if (this.state.activeDictionaryIds.length) {
      let activeDictionaryId =  this.state.activeDictionaryIds[0];

      this.state.dictionaries.forEach((dictionary)=>{
        if (dictionary.id == activeDictionaryId) {
          onlineSource['sourceLang'] = dictionary.sourceLanguage;
        }
      });
    }

    this.setState({
      selectedOnlineSource: onlineSource,
      isOnlineSourceModalVisible: true
    });
  }

  onOnlineSourceModalHidden() {
    this.setState({
      selectedOnlineSource: null,
      isOnlineSourceModalVisible: false
    });
  }

  render() {
    console.log('render');
    logger('render');
    const that = this;

    // let disableDeleteButton = this.state.definitions.length == 1;
    //let activeDictionary = this.getDictionaryById(this.state.dictionaries, this.state.activeDictionaryIds[0]);

    return (
      <main className="ui padded grid" style={{height:'100%'}}>
        <div className="stretched row">
          <div className="six wide column" style={{overflow:'hidden'}}>

            <div className="ui basic segment" style={{overflow:'auto', padding: '1px'}}>

            TEST


            </div>

          </div>
        </div>
      </main>
    );
  }

  addMeaning() {
    // dispatch({
    //   type: Events.ADD_DEFINITION
    // });
  }

  save() {
    let validation = $('.accordion form').form('is valid');
    validation = Array.isArray(validation) ? validation : [validation];

    if (!$('#selectedText').val()) {
      alert('Word field is empty. Duzelt bunu sonra');
      return false;
    }

    let invalidIndex = validation.indexOf(false);
    if( invalidIndex > -1 ) {
      dispatch({
        type: Events.CHANGE_ACTIVE_DEFINITION_INDEX,
        data: invalidIndex
      });
      return false;
    }

    dispatch({
      type: Events.SAVE_DEFINITIONS
    });
  }

  onActiveDictionariesClearAll() {
    dispatch({
      type: Events.ACTIVE_DICTIONARIES_CHANGED,
      data: []

    })
  }

  onActiveDictionariesSelectAll() {
    let activeDictionaryIds = this.state.dictionaries.map((dictionary)=>{
      return dictionary.id;
    });

    dispatch({
      type: Events.ACTIVE_DICTIONARIES_CHANGED,
      data: activeDictionaryIds
    })
  }

  onActiveDictionariesChanged(activeDictionaryIds) {
    dispatch({
      type: Events.ACTIVE_DICTIONARIES_CHANGED,
      data: activeDictionaryIds
    })
  }

  onCurrentWordChanged(e) {
    if(e.keyCode == 13) { // enter key
      e.target.value = wordUtils.normalize(e.target.value);
      dispatch({
        type: Events.CURRENT_WORD_CHANGED,
        data: e.target.value
      });
    }
  }

  isAllFormsValid() {

    // if(this.state.currentWord.trim().length == 0) {
    //   return false;
    // }

    // let invalidIndex = $('.accordion form').form('is valid').indexOf(false);
    // if( invalidIndex > -1 ) {
    //   return false;
    // }

    return true;
  }

  definitionHeader(definition) {
    const id = parseInt(definition.id);
    let labelContent = tr('New Meaning');
    let labelClass = 'ui blue label';

    if(id > -1) {
      labelContent = definition.dictionary.name;
      labelClass = 'ui grey label';
    }

    const result = (
        <span>
          {definition.value || <h4 className="ui grey header" style={noMeanintTextStyle}>{tr('[ No meaning yet ]')}</h4>}
          <span className={labelClass} style={{float: 'right'}}>{labelContent}</span>
        </span>
    );

    return result;
  }

  onActiveIndexChangedHandler(currentIndex) {
    logger('onActiveIndexChangedHandler', currentIndex);
    dispatch({
      type: Events.CHANGE_ACTIVE_DEFINITION_INDEX,
      data: currentIndex
    });
  }

  getDictionaryById(dictionaries, dictionaryId) {
    //let activeDictionary;

    dictionaries.forEach((dictionary)=>{
      if (dictionary.id == dictionaryId) {
        return dictionary;
      }
    });
    return null;
    //a
  }
}
