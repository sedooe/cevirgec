/* Copyright (c) 2015 Kod Gemisi Ltd.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

// @flow
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DocumentTitle from 'react-document-title';
import * as DictionaryActions from '../actions/dictionary';

import { Button, Card, Divider, Grid, Form, Header, Label, List, Icon, Image, Input, Menu, Message, Popup, Radio, Segment } from 'semantic-ui-react'
import tr from '../utils/Translation';
import FlipCard from 'react-flipcard';
import Slider from 'react-slick';
import DefinitionSourceDictionarySelector from '../components/study/DefinitionSourceDictionarySelector';
import ActiveDictionarySelector from '../components/newDefinitionWindow/ActiveDictionarySelector';

import '../../node_modules/slick-carousel/slick/slick.scss';
import '../../node_modules/slick-carousel/slick/slick-theme.scss';

class QuizCardForSlider extends Component {

  static propTypes = {
    onMark: React.PropTypes.func.isRequired,
    question: React.PropTypes.object.isRequired,
    isCorrect: React.PropTypes.bool
  };

  state = {}

  makeSelection = (event, {value}) => {
    let isCorrect = !!this.props.question.choices[value].isCorrect;
    this.setState({selected: value})
    this.props.onMark(Object.assign({}, this.props.question, {isCorrect}))
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
            {Object.values(this.props.question.choices).map((choice) => (
              <Form.Field key={'answer_' + choice.id}>
                <Radio
                  label={choice.text}
                  name='answer'
                  value={choice.id + ''}
                  checked={this.state.selected == choice.id}
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
  arrows: false,
  adaptiveHeight: true
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
class Quiz extends Component {

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
    showResults: false,
    results: {}
  })

  finishStudy = () => {
    if(this.state.isLastSlide ||
       (!this.state.isLastSlide && confirm(tr('Do you want to end studying now?'), tr('Confirm early finish')))
    ) {
      this.setState({studyStarted: false, showResults: true})
    }
  }

  afterSlideChange = (currentSlide) => {
    this.setState({currentSlideIndex: currentSlide})
    this.setState({isLastSlide: currentSlide == this.props.questions.length - 1})
  }

  onCardMarked = (definition) => {
    this.setState({results: Object.assign({}, this.state.results, {[definition.id]: definition.isCorrect})})
    // if timeout is not set, it slides without animation
    setTimeout(() => this.next(), 0)
  }

  studyFinished = () => this.state.isLastSlide && typeof this.state.results[this.props.questions[this.props.questions.length-1].id] == 'boolean'

  render() {
    return (
      <DocumentTitle title={tr('Cevirgec › Quiz')}>
        <div>
          <FlipCardFullWidthStyle />

            <ActiveDictionarySelector
              dictionaries = {[]}
            />

            <div style={{maxWidth: '800px',margin: 'auto'}}>
            {
              this.state.studyStarted &&
              [
                <Segment padded attached key='flipCardsContainerSegment'>
                  <Label attached='top'>{tr('Study Your Words')}</Label>

                  <Slider {...settings} afterChange={this.afterSlideChange} ref='slider'>
                    {this.props.questions.map((question, index) => (
                      /*
                        1px top padding ensures card's top border to be visible otherwise it's hidden.
                        This is only valid for QuizCardForSlider not for Study page
                      */
                      <div style={{height: '300px', padding: '1px 15px'}} key={question.id + '_' + index}>
                        <QuizCardForSlider
                          onMark={this.onCardMarked}
                          question={question}
                          isCorrect={this.state.results[question.id]}
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
            </div>

            <Segment basic className='no-padding'>
              {
                this.state.studyStarted ?
                <Button fluid
                  color={this.studyFinished() ? 'blue' : null}
                  content={tr('End Quiz')}
                  onClick={this.finishStudy}
                />
                :
                <Button fluid color='green'
                  content={tr('Start study')}
                  onClick={this.startStudy}
                />
              }
            </Segment>

            <div style={{maxWidth: '800px',margin: 'auto'}}>
            {
              this.state.showResults &&
              <Segment>
                <Label attached='top'>{tr('My Results')}</Label>
                <StudyResults
                  definitions={this.props.questions}
                  results={this.state.results}
                />
              </Segment>
            }
            </div>
        </div>
      </DocumentTitle>
    );
  }
}


const mapStateToProps = state => ({
  dictionaries: state.dictionary.dictionaries,
  questions: Array(5).fill().map(() => ({
    id: Math.ceil(Math.random()*1000),
    choices: {
      11: {id: 11, text: 'Lorem ipsum'},
      12: {id: 12, text: 'Dolor sit amed'},
      13: {id: 13, text: 'Naquem ip sumat', isCorrect: true},
      14: {id: 14, text: 'Ra qel out enum'}
    },
    definition: {}
  }))
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(DictionaryActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)
