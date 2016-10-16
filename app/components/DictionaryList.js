import React, { Component, PropTypes } from 'react';
import { Button, Checkbox, List, Popup } from 'semantic-ui-react';
import DictionaryModal from './DictionaryModal';
import tr from '../utils/Translation';

const DictionaryList = ({dictionaries, onEdit}) => (
  <List divided relaxed>
    {Object.getOwnPropertyNames(dictionaries).map(function (key) {
      let dictionary = dictionaries[key];
      return (
        <List.Item key={'dictionary-' + key}>
          <List.Content floated='right'>
            <Popup  trigger={<Button icon='add' />} content={tr('Add a new word to this dictionary')}/>
            <Popup trigger={<Button icon='print' />} content={tr('Print')}/>
            <Popup trigger={<Button icon='unhide' />} content={tr('View dictionary content')}/>
            <Popup trigger={<Button icon='edit' onClick={() => onEdit(dictionary)} />} content={tr('Edit')}/>
            <Popup trigger={<Button icon='trash' />} content={tr('Delete')}/>
          </List.Content>
          <List.Content floated='left'>
            <Checkbox toggle checked={dictionary.active} />
          </List.Content>

          <List.Content>
            <List.Header>{dictionary.name}</List.Header>
            <List.Description>{dictionary.sourceLanguage} => {dictionary.targetLanguage} | {dictionary.numberOfDefinitions} definitions</List.Description>
          </List.Content>
        </List.Item>
      )
    })}
  </List>
)

DictionaryList.propTypes = {
  dictionaries: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired
};

export default DictionaryList
