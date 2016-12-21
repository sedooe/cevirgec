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
                <Button basic={typeof this.props.isCorrect != 'boolean' || this.props.isCorrect === false} color='green' icon='thumbs up' content={tr('Got it')} onClick={this.mark.bind(this, true)} />
                <Button basic={typeof this.props.isCorrect != 'boolean' || this.props.isCorrect === true} color='red' icon='thumbs down' content={tr('Failed')} onClick={this.mark.bind(this, false)} />
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

const TotalRowListItem = ({correct, incorrect, skipped}) => (
  <List.Item key='resultListItem'>
    <Grid columns='equal' textAlign='center'>
      <Grid.Column>
        <Segment basic>
          <Label size='big'>
            <Icon name='checkmark' color='green' /> {correct}
          </Label>
        </Segment>
      </Grid.Column>
      <Grid.Column>
        <Segment basic>
          <Label size='big'>
            <Icon name='remove' color='red' /> {incorrect}
          </Label>
        </Segment>
      </Grid.Column>
      <Grid.Column>
        <Segment basic>
          <Label size='big'>
            <Icon name='radio' color='grey' /> {skipped}
          </Label>
        </Segment>
      </Grid.Column>
    </Grid>
  </List.Item>
)

// 'results' is a map of definition ids and corresponding boolean values
// indicating wheter it's correct or not
const StudyResults = ({definitions, results}) => {
  let correct = 0,
      incorrect = 0,
      skipped = 0;
  return (
    <List divided relaxed>
      {definitions.map((definition) => {
        let isCorrect = results[definition.id];
        if(typeof isCorrect != 'boolean') {
          ++skipped;
        }
        else {
          isCorrect ? ++correct : ++incorrect
        }
        return (
          <List.Item key={definition.key + '_' + definition.id}>
            <List.Icon
              size='large'
              verticalAlign='middle'
              name={results[definition.id] ? 'checkmark' : (results[definition.id] === false ? 'remove' : 'radio')}
              color={results[definition.id] ? 'green' : (results[definition.id] === false ? 'red' : 'grey')}
            />
            <List.Content>
              <List.Header>[{definition.id}] Semantic-Org/Semantic-UI</List.Header>
              <List.Description >Updated 10 mins ago</List.Description>
            </List.Content>
          </List.Item>
        );
      })}
      <TotalRowListItem correct={correct} incorrect={incorrect} skipped={skipped} />
    </List>
  )
}

StudyResults.propTypes = {
  definitions: React.PropTypes.array.isRequired,
  results: React.PropTypes.object.isRequired
}

// alternative DIY: https://www.codementor.io/reactjs/tutorial/building-a-flipper-using-react-js-and-less-css
export default class Study extends Component {

  state = {
    dictionaries: [],
    studyStarted: false,
    currentSlideIndex: 0,
    results: {}
  }

  next = () => this.refs.slider.slickNext()

  previous = () => this.refs.slider.slickPrev()

  startStudy = () => this.setState({
    studyStarted: true,
    isLastSlide: false,
    currentSlideIndex: 0,
    showResults: false
  })

  finishStudy = () => {
    if(this.state.isLastSlide ||
       (!this.state.isLastSlide && confirm(tr('Do you want to end studying now?')))
    ) {
      this.setState({studyStarted: false, showResults: true})
    }
  }

  afterSlideChange = (currentSlide) => {
    this.setState({currentSlideIndex: currentSlide})
    this.setState({isLastSlide: currentSlide == this.props.definitions.length - 1})
  }

  onCardMarked = (definition) => {
    this.setState({results: Object.assign({}, this.state.results, {[definition.id]: definition.isCorrect})})
    // if timeout is not set, it slides without animation
    setTimeout(() => this.next(), 0)
  }

  studyFinished = () => this.state.isLastSlide && typeof this.state.results[this.props.definitions[this.props.definitions.length-1].id] == 'boolean'

  render() {
    return (
      <main>
        <FlipCardFullWidthStyle />
        <Grid>
          <Grid.Column width={6}>
            <ActiveDictionarySelector
              dictionaries = {[]}
            />

            {
              this.state.studyStarted &&
              [
                <Segment padded attached key='flipCardsContainerSegment'>
                  <Label attached='top'>{tr('Study Your Words')}</Label>

                  <Slider {...settings} afterChange={this.afterSlideChange} ref='slider'>
                    {this.props.definitions.map((definition, index) => (
                      <div style={{height: '170px', padding: '0 15px'}} key={definition.id + '_' + index}>
                        <FlippingCardForSlider
                          onMark={this.onCardMarked}
                          definition={definition}
                          isCorrect={this.state.results[definition.id]}
                        />
                      </div>
                    ))}
                  </Slider>
                </Segment>,
                <Button.Group attached='bottom' key='buttonGroup'>
                  {/**<Button onClick={this.previous} icon='left arrow' labelPosition='left' content={tr('Previous')} />}
                  <Button onClick={this.next} icon='arrow right' labelPosition='right' content={tr('Next')} /> **/}
                  <Button onClick={this.next} icon='arrow right' labelPosition='right' content={tr('Skip')} />
                </Button.Group>
              ]
            }

            <Segment basic className='no-padding'>
              {
                this.state.studyStarted ?
                <Button fluid
                  color={this.studyFinished() ? 'blue' : null}
                  content={tr('Finish study')}
                  onClick={this.finishStudy}
                />
                :
                <Button fluid color='green'
                  content={tr('Start study')}
                  onClick={this.startStudy}
                />
              }
            </Segment>

            {
              this.state.showResults &&
              <Segment>
                <Label attached='top'>{tr('My Results')}</Label>
                <StudyResults
                  definitions={this.props.definitions}
                  results={this.state.results}
                />
              </Segment>
            }
          </Grid.Column>
          <Grid.Column width={6}>
            <h3>TODOs</h3>
            <ul>
              <li>next/prev => skip/prev</li>
              <li>add early finish button</li>
              <li>add "start/reset/finish" buttons</li>
              <li>show results</li>
            </ul>
            <br/>
            <StudyResults
              definitions={this.props.definitions}
              results={this.state.results}
            />
          </Grid.Column>
        </Grid>
      </main>
    );
  }
}
