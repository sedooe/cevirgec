import React, { Component } from 'react';
import {Button, Divider, Dropdown, Form, Label, Segment } from 'semantic-ui-react';
import tr from '../../utils/Translation';
import ButtonToggle from './ButtonToggle';

const wordTypes = [
  {value: 'n/a', text: tr('N/A')},
  {value: 'noun', text: 'noun'},
  {value: 'verb', text: 'verb'}
]

export default class NewDefinitionForm extends Component {
  state = {
    detailsShown: false
  }

  render () {
    return (
      <Segment>
        <Label attached='top'>{tr('Add new Definitions for <word>')}</Label>
        <Form>
          <Form.Group widths='equal'>
            <Form.Input label='Definition' placeholder={tr('You can choose from right browser')} />
          </Form.Group>
          <HorizontalToggle
            active={this.state.detailsShown}
            onToggle={(active) => this.setState({detailsShown: active})}
          />
          {this.state.detailsShown &&
            <span>
              <Form.Group inline>
                <Form.Field>
                  <Dropdown placeholder={tr('Word Type')} search selection options={wordTypes} />
                </Form.Field>
                <label>{tr(' Word sex')}</label>
                <Form.Radio name='sex' label='⚲' value='neuter' defaultChecked={'value' === 'sm'} className='big-label' onChange={()=>{}} />
                <Form.Radio name='sex' label='♂' value='masculine' defaultChecked={'value' === 'md'} className='big-label' onChange={()=>{}} />
                <Form.Radio name='sex' label='♀' value='feminine' defaultChecked={'value' === 'lg'} className='big-label' onChange={()=>{}} />
              </Form.Group>
              <Form.TextArea rows='3' label={tr('Usage Examples')} placeholder={tr('Usage Examples')} />
              <Form.TextArea rows='3' label={tr('Notes')} placeholder={tr('Notes')} />
              <Form.Group inline className='no-margin'>
                <Button primary content={tr('Save')} style={{marginLeft: 'auto'}} />
              </Form.Group>
            </span>
          }
        </Form>
      </Segment>
    );
  }
}

const HorizontalToggle = ({active, onToggle}) => (
  <Divider horizontal style={active ? null : {marginBottom: 0}}>
    <ButtonToggle basic compact
      type='button'
      size='tiny'
      icon={active ? 'angle up' : 'angle down'}
      content={active ? tr('Less') : tr('More')}
      onToggle={onToggle}
    />
  </Divider>
);

HorizontalToggle.propTypes = {
  onToggle: React.PropTypes.func.isRequired,
  active: React.PropTypes.bool.isRequired
};
