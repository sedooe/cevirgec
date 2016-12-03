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

function getEmptyDefinitionForWord(word) {
  return {
    key: word,
    value: '',
    sex: 'NEUTER',
    type: 'NONE',
    usage: '',
    notes: ''
  }
}

class NewDefinitionWindow extends Component {

  state = {
    currentWord: 'computer',
    currentDefinition: getEmptyDefinitionForWord('computer'), //this is the definition being edited
    dictionaries: [],
    definitions: Array(3).fill({}),
    onlineDictionaries: [],//[{name: 'test 1', url: 'http://www.tureng.com'}, {name: 'test 2', url: 'http://www.thefreedictionary.com'}],
    loading: false,
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
    this.props.actions.createDictionary(dictionary);
  }

  saveOnlineSource = onlineSource => {
    this.hideOnlineSourceModal();
    //TODO call action
  }

  onCurrentWordChange = event => {
    if (event.keyCode === 13) {
      this.props.changeCurrentWordAndLookForDefinitions(event.target.value, this.props.activeDictionaryIds);
    }
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
              disabled={this.state.loading}
              icon='search'
              placeholder={tr('Search a word...')}
              label={tr('Word/Phrase')}
              loading={this.state.loading}
              className={ this.state.loading ? 'no-padding no-border' : 'no-padding no-border raised segment' }
              onKeyUp={this.onCurrentWordChange}
            />

            <NewDefinitionForm
              currentWord={this.props.currentWord}            
              definition={this.state.currentDefinition}
              onSaveDefinition={this.onSaveDefinition}
            />

            <ListOfExistingDefinitions
              definitions={this.props.definitions}
              dictionaries={this.props.dictionaries}              
              currentWord={this.props.currentWord}
              onDefinitionDelete={this.props.onDefinitionDelete}
              onDefinitionEdit={this.props.onDefinitionEdit}
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
  definitions: state.wordAndDefinitions.wordAndDefinitions.definitions
})

const mapDispatchToProps = dispatch => {
  const dictionaryActions = bindActionCreators(DictionaryActions, dispatch);
  const definitionActions = bindActionCreators(WordAndDefinitionActions, dispatch);

  return {
    loadDictionaries: dictionaryActions.loadDictionaries,
    activeDictionariesSelectAll: dictionaryActions.activeDictionariesSelectAll,
    activeDictionariesClearAll: dictionaryActions.activeDictionariesClearAll,
    changeActiveDictionaries: dictionaryActions.changeActiveDictionaries,
    changeCurrentWordAndLookForDefinitions: definitionActions.changeCurrentWordAndLookForDefinitions,
    saveDefinition: definitionActions.saveDefinition,
    onDefinitionDelete: definitionActions.deleteDefinition,
    onDefinitionEdit: definitionActions.editDefinition
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
