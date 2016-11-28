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

import { Button, Label, Segment } from 'semantic-ui-react'
import tr from '../utils/Translation';
import Slider from 'react-slick';
import DefinitionSourceDictionarySelector from '../components/study/DefinitionSourceDictionarySelector';
import StudyCardForSlider from '../components/study/StudyCardForSlider';
import StudyResults from '../components/study/StudyResults';

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

class Study extends Component {

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
      <DocumentTitle title={tr('Cevirgec › Study')}>
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
                    <span style={{float: 'right'}}>{this.state.currentSlideIndex + 1}/{this.props.definitions.length}</span>
                  </Label>

                  <Slider {...settings} afterChange={this.afterSlideChange} ref='slider'>
                    {this.props.definitions.map((definition, index) => (
                      <div style={{height: '170px', padding: '0 15px'}} key={definition.id + '_' + index}>
                        <StudyCardForSlider
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
            </div>

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

            <div style={{maxWidth: '800px',margin: 'auto'}}>
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
            </div>
        </div>
      </DocumentTitle>
    );
  }
}


const mapStateToProps = state => ({
  dictionaries: state.dictionary.dictionaries,
  definitions: Array(5).fill().map(() => ({id: Math.ceil(Math.random()*1000)}))
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(DictionaryActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Study)
