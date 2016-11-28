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
import Slider from 'react-slick';
import DefinitionSourceDictionarySelector from '../components/study/DefinitionSourceDictionarySelector';
import QuizCardForSlider from '../components/quiz/QuizCardForSlider';
import QuizResults from '../components/quiz/QuizResults';

import '../../node_modules/slick-carousel/slick/slick.scss';
import '../../node_modules/slick-carousel/slick/slick-theme.scss';

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

            <DefinitionSourceDictionarySelector
              dictionaries = {Array(5).fill().map(() => ({
                id: Math.ceil(Math.random()*1000),
                name: Math.random().toString(36).substr(2, 6),
                value: Math.random().toString(36).substr(2, 6),
                text: Math.random().toString(36).substr(2, 6)
              }))}
              onSelectedDictionaryChanged={()=>{}}
            />

            <div style={{maxWidth: '800px',margin: 'auto'}}>
            {
              this.state.studyStarted &&
              [
                <Segment padded attached key='flipCardsContainerSegment'>
                  <Label attached='top'>
                    {tr('Study Your Words')}
                    <span style={{float: 'right'}}>{this.state.currentSlideIndex + 1}/{this.props.questions.length}</span>
                  </Label>

                  <Slider {...settings} afterChange={this.afterSlideChange} ref='slider'>
                    {this.props.questions.map((question, index) => (
                      /*
                        1px top padding ensures card's top border to be visible otherwise it's hidden.
                        This is only valid for QuizCardForSlider not for Study page
                      */
                      <div style={{height: '250px', padding: '1px 15px'}} key={question.id + '_' + index}>
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
                  <Button onClick={this.previous} icon='arrow left' labelPosition='left' content={tr('Previous')} />
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
                <QuizResults
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
