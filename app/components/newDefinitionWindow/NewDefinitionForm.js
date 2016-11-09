import React, { Component } from 'react';
import {Divider, Form, Label, Segment } from 'semantic-ui-react';
import tr from '../../utils/Translation';
import ButtonToggle from './ButtonToggle';

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
            <Form.Input label='Definition' placeholder='You can choose from left browser' />
          </Form.Group>
          <HorizontalToggle
            active={this.state.detailsShown}
            onToggle={(active) => this.setState({detailsShown: active})}
          />
          {this.state.detailsShown &&
            <span>
              <Form.Group inline>
                <label>Size</label>
                <Form.Radio label='Small' value='sm' checked={'value' === 'sm'} onChange={this.handleChange} />
                <Form.Radio label='Medium' value='md' checked={'value' === 'md'} onChange={this.handleChange} />
                <Form.Radio label='Large' value='lg' checked={'value' === 'lg'} onChange={this.handleChange} />
              </Form.Group>
              <Form.TextArea label='About' placeholder='Tell us more about you...' />
              <Form.Checkbox label='I agree to the Terms and Conditions' />
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
