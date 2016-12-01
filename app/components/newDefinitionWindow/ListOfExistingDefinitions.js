// @flow

import React, { Component } from 'react';
import { Button, Label, List, Message, Segment } from 'semantic-ui-react';
import DefinitionListItem from './DefinitionListItem';
import tr from '../../utils/Translation';

const ListOfExistingDefinitions = ({definitions, dictionaries, currentWord}) => (
  <Segment disabled={!Object.keys(definitions).length}>
    <Label attached='top'>{tr(`Definitions for ${currentWord}`)}</Label>
    <List divided relaxed verticalAlign='middle' >
      {Object.keys(definitions).length ?
        Object.keys(definitions).map((key, index) => {
          return <DefinitionListItem 
                   definition={definitions[key]}
                   dictionary={dictionaries[definitions[key].dictionaryId]} 
                   key={index + '_df_' + definitions[key].id } />
        })
        :
        <List.Item className='no-side-padding'>
          <List.Content>
            <Message
              header={tr('There are no definitoins for this word yet.')}
              content={tr('Don\'t forget that we only look up from active dictionaries.')}
            />
          </List.Content>
        </List.Item>
      }
    </List>
  </Segment>
)

ListOfExistingDefinitions.propTypes = {
  definitions: React.PropTypes.object.isRequired,
  currentWord: React.PropTypes.string.isRequired,
  dictionaries: React.PropTypes.object.isRequired
};

export default ListOfExistingDefinitions;
