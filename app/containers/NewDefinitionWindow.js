'use strict';

import React, { Component } from 'react'
import { Button, Divider, Grid, Form, Header, Label, List, Icon, Image, Input, Menu, Message, Segment } from 'semantic-ui-react'
import tr from '../utils/Translation';
import ActiveDictionarySelector from '../components/newDefinitionWindow/ActiveDictionarySelector';
import OnlineDictionariesTabView from '../components/newDefinitionWindow/OnlineDictionariesTabView';
import ButtonToggle from '../components/newDefinitionWindow/ButtonToggle';
import NewDefinitionForm from '../components/newDefinitionWindow/NewDefinitionForm';
import ListOfExistingDefinitions from '../components/newDefinitionWindow/ListOfExistingDefinitions';
import '../index.scss';

export default class NewDefinitionWindow extends Component {

  state = {
    currentWord: 'computer',
    dictionaries: [],
    definitions: Array(3).fill(),
    onlineDictionaries: [{name: 'test 1', url: 'http://www.tureng.com'}, {name: 'test 2', url: 'http://www.thefreedictionary.com'}],
    loading: false
  }

  render() {
    return (
      <main className='full-height no-bottom-padding'>
        <Grid className='full-height'>
          <Grid.Column width={6} className='no-bottom-padding'>
            <ActiveDictionarySelector
              dictionaries={this.state.dictionaries}
            />

            <WordSearchInput
              loading={this.state.loading}
            />

            <NewDefinitionForm />

            <ListOfExistingDefinitions
              definitions={this.state.definitions}
            />
          </Grid.Column>

          <VerticalDivider />

          <Grid.Column width={10} className='no-bottom-padding'>
            <OnlineDictionariesTabView
              onlineDictionaries={this.state.onlineDictionaries}
            />
          </Grid.Column>
        </Grid>
      </main>
    )
  }
}

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
