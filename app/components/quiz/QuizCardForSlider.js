// @flow
import React, { Component, PropTypes } from 'react';
import { Button, Card, Label, Icon, Form, Radio } from 'semantic-ui-react'
import tr from '../../utils/Translation';

export default class QuizCardForSlider extends Component {

  static propTypes = {
    onMark: React.PropTypes.func.isRequired,
    definition: React.PropTypes.object.isRequired,
    isCorrect: React.PropTypes.bool
  };

  state = {}

  makeSelection = (event, {value}) => {
    const isCorrect = value === this.props.definition.value;
    this.setState({selected: value})
    this.props.onMark(Object.assign({}, this.props.definition, {isCorrect}))
  }

  render () {
    return (
      <Card color='grey' fluid>
        <Card.Content>
          <Card.Header>
            Steve wants to add you to
          </Card.Header>
          <Card.Description>
            Steve wants to add you to the group best friends
          </Card.Description>
          <Form>
            {this.props.definition.choices.map(choice => (
              <Form.Field key={'answer_' + choice}>
                <Radio
                  label={choice}
                  name='answer'
                  value={choice}
                  checked={this.state.selected == choice}
                  onChange={this.makeSelection}
                />
              </Form.Field>
            ))}
          </Form>
        </Card.Content>
        <Card.Content extra>
          <Icon name='man' />
          <em>n.&nbsp;</em>
          <Label basic size='tiny' style={{float: 'right'}}>
            <Icon name='book' />
            Science Dictionary
          </Label>
        </Card.Content>
      </Card>
    )
  }
}
