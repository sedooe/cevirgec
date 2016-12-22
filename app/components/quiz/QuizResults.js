// @flow
import React, { Component, PropTypes } from 'react';
import { Grid, Label, List, Icon, Segment } from 'semantic-ui-react';
import TotalRowListItem from '../study/TotalRowListItem';
import tr from '../../utils/Translation';

// 'results' is a map of definition ids and corresponding boolean values
// indicating wheter it's correct or not
const QuizResults = ({definitions, results, userChoices}) => {
  let correct = 0,
      incorrect = 0,
      skipped = 0;
  return (
    <List divided relaxed>
      {Object.keys(definitions).map((definitionId) => {
        const definition = definitions[definitionId];
        let isCorrect = results[definitionId];
        if (typeof isCorrect != 'boolean') {
          ++skipped;
        } else {
          isCorrect ? ++correct : ++incorrect
        }

        const usersAnswer = userChoices[definition.id] ? userChoices[definition.id] : 'no answer';

        return (
          <List.Item key={definition.key + '_' + definition.id}>
            <List.Icon
              size='large'
              verticalAlign='middle'
              name={isCorrect ? 'checkmark' : (results[definition.id] === false ? 'remove' : 'radio')}
              color={isCorrect ? 'green' : (results[definition.id] === false ? 'red' : 'grey')}
            />
            <List.Content>
              <List.Header>{isCorrect ? definition.key : definition.key + " -> " + usersAnswer}</List.Header>
              <List.Description>
                {definition.value}
              </List.Description>
            </List.Content>
          </List.Item>
        );
      })}
      <TotalRowListItem correct={correct} incorrect={incorrect} skipped={skipped} />
    </List>
  )
}

QuizResults.propTypes = {
  definitions: React.PropTypes.object.isRequired,
  results: React.PropTypes.object.isRequired,
  userChoices: React.PropTypes.object.isRequired
}

export default QuizResults;
