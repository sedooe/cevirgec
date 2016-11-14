import React, { Component } from 'react';
import {Button, Icon, Label, List, Segment} from 'semantic-ui-react';
import ButtonToggle from './ButtonToggle';
import tr from '../../utils/Translation';

export default class DefinitionListItem extends Component {
  state = {
    detailsShown: false
  }

  toggleDetails = (active) => {
    this.setState({detailsShown: active});
    console.log(active);
  }

  render () {
    return (
      <List.Item className='no-side-padding'>
        <List.Content>
          <Label ribbon color='blue' size='mini'>{tr('new')}</Label>
          <Icon name='man' />
          <em>n.&nbsp;</em>
          <span>Lorem ipsum dolor sit amed.</span>
        </List.Content>
        <List.Content style={{marginTop: '10px'}}>
            <Label basic size='tiny'>
              <Icon name='browser' />
              Context
            </Label>
            <Label basic size='tiny'>
              <Icon name='book' />
              Science Dictionary
            </Label>
            <Button basic compact size='tiny' icon='edit' floated='right' />
            <Button basic compact size='tiny' icon='trash' floated='right' />
            <ButtonToggle basic compact size='tiny'
              icon={this.state.detailsShown ? 'angle up' : 'angle down'}
              content={this.state.detailsShown ? tr('Less') : tr('More')}
              floated='right'
              onToggle={this.toggleDetails}
            />
        </List.Content>
        {this.state.detailsShown && <List.Content>
          <Segment basic className='no-side-padding'>
            <Segment className='no-shadow'>
              <Label attached='top right'>{tr('Usage Examples')}</Label>
              Lorem ipsum dolor sit amed.
            </Segment>
            <Segment className='no-shadow'>
              <Label attached='top right'>{tr('Notes')}</Label>
              Lorem ipsum dolor sit amed.
            </Segment>
          </Segment>
        </List.Content>}
      </List.Item>
    );
  }
}
