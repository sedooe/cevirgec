import React, { Component } from 'react';
import {Button, Label, List, Segment} from 'semantic-ui-react';
import DefinitionListItem from './DefinitionListItem';
import tr from '../../utils/Translation';

const ListOfExistingDefinitions = ({definitions}) => (
  <Segment disabled={!definitions.length}>
    <Label attached='top'>{tr('Definitions for $1', 'the word')}</Label>
    <List divided relaxed verticalAlign='middle' >
      {definitions.length ?
        definitions.map(function (definition) {
          return <DefinitionListItem definition={definition} />
        })
        :
        <List.Item style={noSidePadding}>
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
  definitions: React.PropTypes.array.isRequired,
};

export default ListOfExistingDefinitions;
