/* Copyright (c) 2015 Kod Gemisi Ltd.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

// @flow
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DocumentTitle from 'react-document-title';
import * as QuizActions from '../actions/quiz';
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

  componentDidMount = () => {
    this.props.loadDictionaries();
  }

  state = {
    dictionaryId: 0,
    quizStarted: false,
    currentSlideIndex: 0,
    isLastSlide: false,
    showResults: false,
    results: {},
    userChoices: {}
  }

  next = () => this.refs.slider.slickNext()

  previous = () => this.refs.slider.slickPrev()

  startQuiz = () => {
    this.setState({
      quizStarted: true,
      isLastSlide: false,
      currentSlideIndex: 0,
      showResults: false,
      results: {}
    });

    this.props.startQuiz(this.state.dictionaryId);
  }

  finishQuiz = () => {
    if (this.state.isLastSlide ||
       (!this.state.isLastSlide && confirm(tr('Do you want to end quiz now?'), tr('Confirm early finish')))
    ) {
      this.setState({quizStarted: false, showResults: true});
      this.props.finishQuiz(this.state.results);
    }
  }

  afterSlideChange = (currentSlide) => {
    this.setState({
      currentSlideIndex: currentSlide,
      isLastSlide: currentSlide == Object.keys(this.props.quizDefinitions).length - 1
    });
  }

  onCardMarked = (definition, userChoice) => {
    this.setState({
      results: Object.assign({}, this.state.results, {[definition.id]: definition.isCorrect}),
      userChoices: Object.assign({}, this.state.userChoices, {[definition.id]: userChoice})
    });
      
    // if timeout is not set, it slides without animation
    setTimeout(() => this.next(), 0);      
  }

  quizFinished = () => {
    return this.state.isLastSlide;
  }

  changeSelectedDictionary = (dictionaryId: number) => this.setState({ dictionaryId })

  render() {
    const { quizDefinitions } = this.props;
    const quizDefinitionsIds = Object.keys(quizDefinitions);

    return (
      <DocumentTitle title={tr('Cevirgec › Quiz')}>
        <div>
          <FlipCardFullWidthStyle />

            <DefinitionSourceDictionarySelector
              dictionaries={this.props.dictionaries}
              onSelectedDictionaryChange={this.changeSelectedDictionary}
            />

            <div style={{maxWidth: '800px',margin: 'auto'}}>
            {
              this.state.quizStarted ? (quizDefinitions.error ? <h3>{quizDefinitions.error}</h3> :
              [
                <Segment padded attached key='flipCardsContainerSegment'>
                  <Label attached='top'>
                    {tr('Quiz Your Words')}
                    <span style={{float: 'right'}}>{this.state.currentSlideIndex + 1}/{quizDefinitionsIds.length}</span>
                  </Label>

                  {quizDefinitionsIds.length && <Slider {...settings} afterChange={this.afterSlideChange} ref='slider'>
                    {quizDefinitionsIds.map((definitionId, index) => (
                      /*
                        1px top padding ensures card's top border to be visible otherwise it's hidden.
                        This is only valid for QuizCardForSlider not for Study page
                      */
                      <div style={{height: '250px', padding: '1px 15px'}} key={definitionId + '_' + index}>
                        <QuizCardForSlider
                          onMark={this.onCardMarked}
                          definition={quizDefinitions[definitionId]}
                          isCorrect={true}
                        />
                      </div>
                    ))}
                  </Slider>}
                </Segment>,
                <Button.Group attached='bottom' key='buttonGroup'>
                  {/**<Button onClick={this.previous} icon='left arrow' labelPosition='left' content={tr('Previous')} />}
                  <Button onClick={this.next} icon='arrow right' labelPosition='right' content={tr('Next')} /> **/}
                  <Button onClick={this.previous} icon='arrow left' labelPosition='left' content={tr('Previous')} />
                  <Button onClick={this.next} icon='arrow right' labelPosition='right' content={tr('Skip')} />
                </Button.Group>
              ]
              ) : null
            }
            </div>

            <Segment basic className='no-padding'>
              {
                this.state.quizStarted && !quizDefinitions.error ?
                <Button fluid
                  color={this.quizFinished() ? 'blue' : null}
                  content={tr('End Quiz')}
                  onClick={this.finishQuiz}
                />
                :
                <Button fluid color='green'
                  content={tr('Start quiz')}
                  onClick={this.startQuiz}
                />
              }
            </Segment>

            <div style={{maxWidth: '800px',margin: 'auto'}}>
            {
              this.state.showResults &&
              <Segment>
                <Label attached='top'>{tr('My Results')}</Label>
                <QuizResults
                  definitions={this.props.quizDefinitions}
                  results={this.state.results}
                  userChoices={this.state.userChoices}
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
  quizDefinitions: state.quiz.quiz
})

const mapDispatchToProps = dispatch => {
  const dictionaryActions = bindActionCreators(DictionaryActions, dispatch);
  const quizActions = bindActionCreators(QuizActions, dispatch);

  return {
    loadDictionaries: dictionaryActions.loadDictionaries,
    startQuiz: quizActions.startQuiz,
    finishQuiz: quizActions.finishQuiz
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)
