import React, { Component, PropTypes } from 'react';
import { Button, Checkbox, List, Popup } from 'semantic-ui-react';
import DictionaryModal from './DictionaryModal';
import tr from '../utils/Translation';

const propFunctionProxy = (prop, dictionary) => {
  prop(dictionary);
}

const DictionaryList = ({dictionaries, onEdit, onDelete, onCheckboxToggle}) => (
  <List divided relaxed>
    {Object.getOwnPropertyNames(dictionaries).map((key) => {
      let dictionary = dictionaries[key];
      return (
        <List.Item key={'dictionary-' + key}>
          <List.Content floated='right'>
            <Popup  trigger={<Button icon='add' />} content={tr('Add a new word to this dictionary')}/>
            <Popup trigger={<Button icon='print' />} content={tr('Print')}/>
            <Popup trigger={<Button icon='unhide' />} content={tr('View dictionary content')}/>
            <Popup trigger={<Button icon='edit' onClick={propFunctionProxy.bind(null, onEdit, dictionary)} />} content={tr('Edit')}/>
            <Popup trigger={<Button icon='trash' onClick={propFunctionProxy.bind(null, onDelete, dictionary)} />} content={tr('Delete')}/>
          </List.Content>
          <List.Content floated='left'>
            <Checkbox toggle checked={dictionary.active} onChange={propFunctionProxy.bind(null, onCheckboxToggle, dictionary.id)} />
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
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onCheckboxToggle: PropTypes.func.isRequired
};

export default DictionaryList
