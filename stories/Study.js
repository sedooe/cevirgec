import React, { Component } from 'react'
import { Button, Card, Divider, Grid, Form, Header, Label, List, Icon, Image, Input, Menu, Message, Segment } from 'semantic-ui-react'
import tr from '../app/utils/Translation';
import FlipCard from 'react-flipcard';
import Slider from 'react-slick';
import DefinitionSourceDictionarySelector from './DefinitionSourceDictionarySelector';
import ActiveDictionarySelector from '../app/components/newDefinitionWindow/ActiveDictionarySelector';

import '../node_modules/slick-carousel/slick/slick.scss';
import '../node_modules/slick-carousel/slick/slick-theme.scss';

class FlippingCardForSlider extends Component {

  state = {
    isFlipped: false
  }

  toggle = () => this.setState({isFlipped: !this.state.isFlipped})

  render () {
    return (
        <FlipCard disabled={true} flipped={this.state.isFlipped}>
          <Card fluid>
            <Card.Content>
              <Image floated='right' size='mini' src='http://semantic-ui.com/images/avatar/large/steve.jpg' />
              <Card.Header>
                Steve Sanders
              </Card.Header>
              <Card.Meta>
                Friends of Elliot
              </Card.Meta>
              <Card.Description>
                Steve wants to add you to the group <strong>best friends</strong>
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <div className='ui two buttons'>
                <Button basic color='green' onClick={this.toggle}>Approve</Button>
                <Button basic color='red'>Decline</Button>
              </div>
            </Card.Content>
          </Card>

          <Card fluid>
            <Card.Content>
              <Image floated='right' size='mini' src='http://semantic-ui.com/images/avatar2/large/molly.png' />
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
                <Button basic color='green' onClick={this.toggle}>Approve</Button>
                <Button basic color='red'>Decline</Button>
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
  className: 'center',
  centerMode: true,
  infinite: false,
  centerPadding: '60px',
  slidesToShow: 1,
  speed: 500
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
            <FlippingCardForSlider />
          </Grid.Column>
          <Grid.Column width={6}>
            <div>
              <h2>Center Mode</h2>
              <Slider {...settings} ref='slider'>
                {this.props.definitions.map(() => (
                  <div style={{height: '170px', padding: '0 15px'}}>
                    <FlippingCardForSlider />
                  </div>
                ))}
              </Slider>
              <div style={{textAlign: 'center'}}>
                <Button onClick={this.previous}>Previous</Button>
                <Button onClick={this.next}>Next</Button>
              </div>
            </div>
          </Grid.Column>
        </Grid>
      </main>
    );
  }
}
