// @flow
import React, { Component, PropTypes } from 'react';
import { Grid, Label, List, Icon, Segment } from 'semantic-ui-react'
import tr from '../../utils/Translation';

const TotalRowListItem = ({correct, incorrect, skipped}) => (
  <List.Item key='resultListItem'>
    <Grid columns='equal' textAlign='center'>
      <Grid.Column>
        <Segment basic>
          <Label size='big'>
            <Icon name='checkmark' color='green' /> {tr('correct')}
          </Label>
        </Segment>
      </Grid.Column>
      <Grid.Column>
        <Segment basic>
          <Label size='big'>
            <Icon name='remove' color='red' /> {tr('incorrect')}
          </Label>
        </Segment>
      </Grid.Column>
      <Grid.Column>
        <Segment basic>
          <Label size='big'>
            <Icon name='radio' color='grey' /> {tr('skipped')}
          </Label>
        </Segment>
      </Grid.Column>
    </Grid>
  </List.Item>
)

export default TotalRowListItem;
