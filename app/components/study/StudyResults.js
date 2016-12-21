// @flow
import React, { Component, PropTypes } from 'react';
import { Grid, Label, List, Icon, Segment } from 'semantic-ui-react';
import TotalRowListItem from './TotalRowListItem';
import tr from '../../utils/Translation';

// 'results' is a map of definition ids and corresponding boolean values
// indicating wheter it's correct or not
const StudyResults = ({definitions, results}) => {
  let correct = 0,
      incorrect = 0,
      skipped = 0;
  return (
    <List divided relaxed>
      {Object.keys(definitions).map((definitionId) => {
        const definition = definitions[definitionId];
        let isCorrect = results[definitionId];
        if(typeof isCorrect != 'boolean') {
          ++skipped;
        }
        else {
          isCorrect ? ++correct : ++incorrect
        }
        return (
          <List.Item key={definition.key + '_' + definition.id}>
            <List.Icon
              size='large'
              verticalAlign='middle'
              name={results[definition.id] ? 'checkmark' : (results[definition.id] === false ? 'remove' : 'radio')}
              color={results[definition.id] ? 'green' : (results[definition.id] === false ? 'red' : 'grey')}
            />
            <List.Content>
              <List.Header>{definition.key}</List.Header>
              <List.Description>{definition.value}</List.Description>
            </List.Content>
          </List.Item>
        );
      })}
      <TotalRowListItem correct={correct} incorrect={incorrect} skipped={skipped} />
    </List>
  )
}

StudyResults.propTypes = {
  definitions: React.PropTypes.object.isRequired,
  results: React.PropTypes.object.isRequired
}

export default StudyResults;
