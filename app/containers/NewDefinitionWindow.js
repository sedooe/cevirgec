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
    console.log(onlineSource);
  }

  render() {
    return (
      <main className='full-height no-bottom-padding'>
        <Grid className='full-height'>
          <Grid.Column width={6} className='no-bottom-padding'>
            <ActiveDictionarySelector
              dictionaries={this.state.dictionaries}
              onAddDictionary={this.openDictionaryModal}
            />

            <WordSearchInput
              loading={this.state.loading}
            />

            <NewDefinitionForm
              definition={this.state.currentDefinition}
            />

            <ListOfExistingDefinitions
              definitions={this.state.definitions}
            />
          </Grid.Column>

          <VerticalDivider />

          <Grid.Column width={10} className='no-bottom-padding'>
            <OnlineDictionariesTabView
              onlineDictionaries={this.state.onlineDictionaries}
              onAddOnlineSource={this.openOnlineSourceModal}
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

})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(DictionaryActions, dispatch)
})

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

const WordSearchInput = ({loading}) => (
  <Input fluid disabled={loading}
    icon='search'
    placeholder={tr('Search a word...')}
    label={tr('Word/Phrase')}
    loading={loading}
    className={ loading ? 'no-padding no-border' : 'no-padding no-border raised segment' }
  />
);
