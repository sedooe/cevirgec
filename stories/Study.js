import React, { Component } from 'react'
import { Button, Card, Divider, Grid, Form, Header, Label, List, Icon, Image, Input, Menu, Message, Popup, Segment } from 'semantic-ui-react'
import tr from '../app/utils/Translation';
import FlipCard from 'react-flipcard';
import Slider from 'react-slick';
import DefinitionSourceDictionarySelector from './DefinitionSourceDictionarySelector';
import ActiveDictionarySelector from '../app/components/newDefinitionWindow/ActiveDictionarySelector';

import '../node_modules/slick-carousel/slick/slick.scss';
import '../node_modules/slick-carousel/slick/slick-theme.scss';

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

class FlippingCardForSlider extends Component {

  state = {
    isFlipped: false
  }

  toggle = () => this.setState({isFlipped: !this.state.isFlipped})

  render () {
    return (
        <FlipCard disabled={true} flipped={this.state.isFlipped}>
          <Card color='grey' fluid>
            <Card.Content>
              <FlipButton
                onClick={this.toggle}
                message={tr('See meaning')}
              />
              <Card.Header>
                Steve wants to add you to
              </Card.Header>
              <Card.Description>
                Steve wants to add you to the group best friends
              </Card.Description>
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

          <Card fluid>
            <Card.Content>
              <FlipButton
                onClick={this.toggle}
                message={tr('See the word')}
              />
              <Card.Header>
                Molly Thomas
              </Card.Header>
              <Card.Meta>
                New User
              </Card.Meta>
              <Card.Description>
                Molly wants to add you to the group <strong>musicians</strong>
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <div className='ui two buttons'>
                <Button basic color='green' icon='thumbs outline up' content={tr('Got it')} onClick={this.toggle} />
                <Button basic color='red' icon='thumbs outline down' content={tr('Failed')} onClick={this.toggle} />
              </div>
            </Card.Content>
          </Card>
        </FlipCard>
    )
  }
}

const FlipCardFullWidthStyle = () => (
  <style>
    {`
      .ReactFlipCard,
      .ReactFlipCard--horizontal,
      .ReactFlipCard__Flipper,
      .ReactFlipCard__Front,
      .ReactFlipCard__Back {
        width: 100%;
      }
      `}
  </style>
)

const settings = {
  centerMode: true,
  infinite: false,
  // centerPadding: '50px',//default
  speed: 500,
  arrows: false
};

// alternative DIY: https://www.codementor.io/reactjs/tutorial/building-a-flipper-using-react-js-and-less-css
export default class Study extends Component {

  next = () => this.refs.slider.slickNext()

  previous = () => this.refs.slider.slickPrev()

  render() {
    return (
      <main>
        <FlipCardFullWidthStyle />
        <Grid>
          <Grid.Column width={6}>
            <ActiveDictionarySelector
              dictionaries = {[]}
            />

            <Segment padded attached>
              <Label attached='top'>{tr('Study Your Words')}</Label>

              <Slider {...settings} ref='slider'>
                {this.props.definitions.map((val, index) => (
                  <div style={{height: '170px', padding: '0 15px'}} key={val.id + '_' + index}>
                    <FlippingCardForSlider />
                  </div>
                ))}
              </Slider>
            </Segment>
            <Button.Group attached='bottom'>
              <Button onClick={this.previous} icon='left arrow' labelPosition='left' content={tr('Previous')} />
              <Button onClick={this.next} icon='right arrow' labelPosition='right' content={tr('Next')} />
            </Button.Group>

          </Grid.Column>
          <Grid.Column width={6}>
            <h3>TODOs</h3>
            <ul>
              <li>next/prev => skip/prev</li>
              <li>add early finish button</li>
              <li>add "start/reset/finish" buttons</li>
              <li>show results</li>
            </ul>
          </Grid.Column>
        </Grid>
      </main>
    );
  }
}
