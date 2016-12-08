// @flow

'use strict';

import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Divider, Grid, Form, Header, Label, List, Icon, Image, Input, Menu, Message, Segment } from 'semantic-ui-react'
import tr from '../utils/Translation';
import ActiveDictionarySelector from '../components/newDefinitionWindow/ActiveDictionarySelector';
import OnlineDictionariesTabView from '../components/newDefinitionWindow/OnlineDictionariesTabView';
import ButtonToggle from '../components/newDefinitionWindow/ButtonToggle';
import NewDefinitionForm from '../components/newDefinitionWindow/NewDefinitionForm';
import ListOfExistingDefinitions from '../components/newDefinitionWindow/ListOfExistingDefinitions';
import DictionaryModal from '../components/DictionaryModal';
import OnlineSourceModal from '../components/OnlineSourceModal';
import * as DictionaryActions from '../actions/dictionary';
import * as WordAndDefinitionActions from '../actions/wordAndDefinitions';
import * as OnlineSourceActions from '../actions/onlineSource';

class NewDefinitionWindow extends Component {

  state = {
    dictionaryModalOpen: false,
    onlineSourceModalOpen: false
  }

  componentDidMount = () => {
    this.props.loadDictionaries();
  }

  openDictionaryModal = () => this.setState({dictionaryModalOpen: true})

  hideDictionaryModal = () => this.setState({dictionaryModalOpen: false})

  openOnlineSourceModal = () => this.setState({onlineSourceModalOpen: true})

  hideOnlineSourceModal = () => this.setState({onlineSourceModalOpen: false})

  saveDictionary = dictionary => {
    this.hideDictionaryModal();
    this.props.createDictionary(dictionary);
  }

  saveOnlineSource = onlineSource => {
    this.hideOnlineSourceModal();
    this.props.createOnlineSource(onlineSource);
  }

  changeCurrentWord = (word: String) => {
    this.props.changeCurrentWordAndLookForDefinitions(word, this.props.activeDictionaryIds);
  }

  onCurrentWordChange = event => {
    if (event.keyCode === 13) {
      this.changeCurrentWord(event.target.value);
    }
  }

  handleBlur = event => {
    this.changeCurrentWord(event.target.value);
  }

  onSaveDefinition = (definition: Object) => {
    this.props.saveDefinition(definition, this.props.activeDictionaryIds);
  }

  onDictionariesSelectAll = (dictionaries: Object) => {
    this.props.activeDictionariesSelectAll(dictionaries, this.props.currentWord);
  }

  onActiveDictionariesChange = (dictionaryIds: Array<String>, dictionaries: Object) => {
    this.props.changeActiveDictionaries(dictionaryIds, dictionaries, this.props.currentWord);
  }

  render() {
    
    return (
      <main className='full-height no-bottom-padding'>
        <Grid className='full-height'>
          <Grid.Column width={6} className='no-bottom-padding'>
            <ActiveDictionarySelector
              dictionaries={this.props.dictionaries}
              activeDictionaryIds={this.props.activeDictionaryIds}
              onAddDictionary={this.openDictionaryModal}
              onSelectAll={this.onDictionariesSelectAll}
              onClearAll={this.props.activeDictionariesClearAll}
              onActiveDictionariesChange={this.onActiveDictionariesChange}
            />

            <Input fluid
              defaultValue={this.props.currentWord}
              icon='search'
              placeholder={tr('Search a word...')}
              label={tr('Word/Phrase')}
              className='no-padding no-border'
              onKeyUp={this.onCurrentWordChange}
              onBlur={this.handleBlur}
            />

            <NewDefinitionForm
              currentWord={this.props.currentWord}            
              onSaveDefinition={this.onSaveDefinition}
            />

            <ListOfExistingDefinitions
              definitions={this.props.definitions}
              dictionaries={this.props.dictionaries}              
              currentWord={this.props.currentWord}
              onDefinitionDelete={this.props.onDefinitionDelete}
              onDefinitionEdit={this.props.onDefinitionEdit}
              freshDefinitions={this.props.freshDefinitions}
            />
          </Grid.Column>

          <VerticalDivider />

          <Grid.Column width={10} className='no-bottom-padding'>
            <OnlineDictionariesTabView
              onlineSources={this.props.onlineSources}
              onAddOnlineSource={this.openOnlineSourceModal}
              currentWord={this.props.currentWord}
            />
          </Grid.Column>
        </Grid>

        <DictionaryModal
          open={this.state.dictionaryModalOpen}
          onHide={this.hideDictionaryModal}
          onSave={this.saveDictionary}
          dictionary={{}}
        />

        <OnlineSourceModal
          open={this.state.onlineSourceModalOpen}
          onHide={this.hideOnlineSourceModal}
          onSave={this.saveOnlineSource}
          onlineSource={{}}
        />
      </main>
    )
  }
}

const mapStateToProps = state => ({
  dictionaries: state.dictionary.dictionaries,
  activeDictionaryIds: state.dictionary.activeDictionaries,
  onlineSources: state.onlineSource.onlineSources,
  currentWord: state.wordAndDefinitions.wordAndDefinitions.currentWord,
  definitions: state.wordAndDefinitions.wordAndDefinitions.definitions,
  freshDefinitions: state.wordAndDefinitions.wordAndDefinitions.freshDefinitions
})

const mapDispatchToProps = dispatch => {
  const dictionaryActions = bindActionCreators(DictionaryActions, dispatch);
  const definitionActions = bindActionCreators(WordAndDefinitionActions, dispatch);
  const onlineSourceActions = bindActionCreators(OnlineSourceActions, dispatch);

  return {
    loadDictionaries: dictionaryActions.loadDictionaries,
    createDictionary: dictionaryActions.createDictionary,
    activeDictionariesSelectAll: dictionaryActions.activeDictionariesSelectAll,
    activeDictionariesClearAll: dictionaryActions.activeDictionariesClearAll,
    changeActiveDictionaries: dictionaryActions.changeActiveDictionaries,
    changeCurrentWordAndLookForDefinitions: definitionActions.changeCurrentWordAndLookForDefinitions,
    saveDefinition: definitionActions.saveDefinition,
    onDefinitionDelete: definitionActions.deleteDefinition,
    onDefinitionEdit: definitionActions.editDefinition,
    createOnlineSource: onlineSourceActions.createOnlineSource
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewDefinitionWindow)

const VerticalDivider = () => (
  <div style={{position: 'relative'}} className='no-padding'>
    {/*
      Wrapper is for vertical divider bug https://github.com/Semantic-Org/Semantic-UI/issues/4342#issuecomment-253209017
      Also we cannot use !important https://github.com/facebook/react/issues/1881
      */}
    <Divider vertical>
      <Icon name='square outline' style={{color: '#aaa'}} />
    </Divider>
  </div>
);