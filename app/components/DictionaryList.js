// @flow
import React, { PropTypes } from 'react';
import { Button, Checkbox, List, Popup } from 'semantic-ui-react';
import tr from '../utils/Translation';

const propFunctionProxy = (prop: Function, dictionary: Object) => {
  prop(dictionary);
}

type Props = {
  dictionaries: Object,
  onView: Function,
  onEdit: Function,
  onDelete: Function,
  onCheckboxToggle: Function
}

const DictionaryList = (props: Props) => {

  let dictionaryKeys = Object.getOwnPropertyNames(props.dictionaries);

  if (dictionaryKeys.length) {
    return (
      <List divided relaxed>
        {Object.getOwnPropertyNames(props.dictionaries).map((key) => {
          const dictionary = props.dictionaries[key];
          return (
            <List.Item key={`dictionary-${key}`}>
              <List.Content floated="right">
                <Popup trigger={<Button icon="add" />} content={tr('Add a new word to this dictionary')} />
                {/* <Popup trigger={<Button icon="print" />} content={tr('Print')} /> */}
                <Popup trigger={<Button icon="unhide" onClick={propFunctionProxy.bind(null, props.onView, dictionary)} />} content={tr('View dictionary content')} />
                <Popup trigger={<Button icon="edit" onClick={propFunctionProxy.bind(null, props.onEdit, dictionary)} />} content={tr('Edit')} />
                <Popup trigger={<Button icon="trash" onClick={propFunctionProxy.bind(null, props.onDelete, dictionary)} />} content={tr('Delete')} />
              </List.Content>
              <List.Content floated="left">
                <Checkbox
                  toggle
                  checked={dictionary.active}
                  onChange={propFunctionProxy.bind(null, props.onCheckboxToggle, dictionary.id)}
                  />
              </List.Content>

              <List.Content>
                <List.Header>{dictionary.name}</List.Header>
                <List.Description>{dictionary.sourceLanguage}=> {dictionary.targetLanguage}| {dictionary.numberOfDefinitions}definitions</List.Description>
              </List.Content>
            </List.Item>
          )
        })}
      </List>
    )
  }
  else {
    return (
      <div className="ui icon message">
        <i className="info icon"></i>
        <div className="content">
          {tr('There is no dictionary yet.')}
        </div>
      </div>
    )
  }
};

DictionaryList.propTypes = {
  dictionaries: PropTypes.object.isRequired,
  onView: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onCheckboxToggle: PropTypes.func.isRequired
};

export default DictionaryList
