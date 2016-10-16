import React, { Component } from 'react';
import { Button, Checkbox, List, Popup } from 'semantic-ui-react'
import tr from '../app/utils/Translation';
// <CheckboxToggle label={tr('In Use')} name="active" defaultChecked={dictionary.active} onChange={that.toggleUsage.bind(that, dictionary)} />

class DictionaryList extends Component {

  render() {
    let dictionaryMap = {1: {
      name: "deneme",
      sourceLanguage: "af",
      targetLanguage: "tr",
      numberOfDefinitions: "9",
      active: true
    },
    2: {
      name: "deneme",
      sourceLanguage: "za",
      targetLanguage: "tr",
      numberOfDefinitions: "90",
      active: true
    }
  };

    return (
      <List divided relaxed>
        {Object.getOwnPropertyNames(dictionaryMap).map(function (key) {
          let dictionary = dictionaryMap[key];
          return (
            <List.Item>
              <List.Content floated='right'>
                <Popup trigger={<Button icon='add' />} content={tr('Add a new word to this dictionary')}/>
                <Popup trigger={<Button icon='print' />} content={tr('Print')}/>
                <Popup trigger={<Button icon='unhide' />} content={tr('View dictionary content')}/>
                <Popup trigger={<Button icon='edit' />} content={tr('Edit')}/>
                <Popup trigger={<Button icon='trash' />} content={tr('Delete')}/>
              </List.Content>
              <List.Content floated='left'>
                <Checkbox toggle />
              </List.Content>

              <List.Content>
                <List.Header>{dictionary.name}</List.Header>
                <List.Description>{dictionary.sourceLanguage} => {dictionary.targetLanguage} | {dictionary.numberOfDefinitions} definitions</List.Description>
              </List.Content>
            </List.Item>
          )
        })}
      </List>
    );
  }
}

export default DictionaryList
