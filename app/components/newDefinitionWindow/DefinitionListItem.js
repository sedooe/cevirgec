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
  }

  static propTypes = {
    definition: React.PropTypes.object.isRequired,
    dictionary: React.PropTypes.object.isRequired
  };

  iconValue = sex => {
    switch (sex) {
      case 'MASCULINE':
        return 'man';
      case 'FEMININE':
        return 'woman';
      default:
        return 'neuter';
    }
  }

  deleteDefinition = () => {
    if (confirm('Are you sure to delete this definition?')) {
      this.props.onDefinitionDelete(this.props.definition.id);      
    }
  }

  render () {
    const { definition, dictionary } = this.props;

    return (
      <List.Item className='no-side-padding'>
        <List.Content>
          <Label ribbon color='blue' size='mini'>{tr('new')}</Label>
          <Icon name={this.iconValue(definition.sex)} />
          <em>n.&nbsp;</em>  {/* FIXME: use real value of it. noun, verb, phrase etc. */}
          <span>{definition.value}</span>
        </List.Content>
        <List.Content style={{marginTop: '10px'}}>
            <Label basic size='tiny'>
              <Icon name='browser' />
              {dictionary.context || 'No Context'}
            </Label>
            <Label basic size='tiny'>
              <Icon name='book' />
              {dictionary.name}
            </Label>
            <Button basic compact size='tiny' icon='edit' floated='right' />
            <Button onClick={this.deleteDefinition} basic compact size='tiny' icon='trash' floated='right' />
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
              {definition.usage}
            </Segment>
            <Segment className='no-shadow'>
              <Label attached='top right'>{tr('Notes')}</Label>
              {definition.notes}
            </Segment>
          </Segment>
        </List.Content>}
      </List.Item>
    );
  }
}
