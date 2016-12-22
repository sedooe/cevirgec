// @flow
import React, { Component, PropTypes } from 'react';
import { Button, Card, Label, Icon, Popup } from 'semantic-ui-react'
import tr from '../../utils/Translation';
import FlipCard from 'react-flipcard';

const FlipButton = ({onClick, message}) => (
  <Popup
    content={message}
    trigger={
      <Button basic icon floated='right' onClick={onClick}>
        <Icon name='refresh' />
      </Button>
    }
    on='hover'
  />
);

// alternative DIY: https://www.codementor.io/reactjs/tutorial/building-a-flipper-using-react-js-and-less-css
export default class StudyCardForSlider extends Component {

  static propTypes = {
    onMark: React.PropTypes.func.isRequired,
    definition: React.PropTypes.object.isRequired,
    isCorrect: React.PropTypes.bool
  };

  state = {
    isFlipped: false
  }

  toggle = () => this.setState({isFlipped: !this.state.isFlipped})

  mark = (isCorrect) => {
    this.props.onMark(Object.assign({}, this.props.definition, {isCorrect}))
  }

  makeSelection = () => {throw 'Not implemented, TODO read selected radio input'}

  render () {
    const { definition } = this.props;

    return (
        <FlipCard disabled={true} flipped={this.state.isFlipped}>
          <Card color='grey' fluid>
            <Card.Content>
              <FlipButton
                onClick={this.toggle}
                message={tr('See meaning')}
              />
              <Card.Header>
                {definition.key}
              </Card.Header>
              <Card.Description>
                <ul>
                  <li>Usage: {definition.usage || 'no usage'}</li>
                  <li>Notes: {definition.notes || 'no notes'}</li>
                </ul>
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Icon name='man' />
              <em>n.&nbsp;</em>
            </Card.Content>
          </Card>

          <Card fluid>
            <Card.Content>
              <FlipButton
                onClick={this.toggle}
                message={tr('See the word')}
              />
              <Card.Header>
                {definition.value}
              </Card.Header>
            </Card.Content>
            <Card.Content extra>
              <div className='ui two buttons'>
                <Button basic={typeof this.props.isCorrect != 'boolean' || this.props.isCorrect === false} color='green' icon='thumbs up' content={tr('Got it')} onClick={this.mark.bind(this, true)} />
                <Button basic={typeof this.props.isCorrect != 'boolean' || this.props.isCorrect === true} color='red' icon='thumbs down' content={tr('Failed')} onClick={this.mark.bind(this, false)} />
              </div>
            </Card.Content>
          </Card>
        </FlipCard>
    )
  }
}
