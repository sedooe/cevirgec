// @flow

/* Copyright (c) 2015 Kod Gemisi Ltd.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DocumentTitle from 'react-document-title';
import * as DictionaryActions from '../actions/dictionary';
import * as StudyActions from '../actions/study';
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

  componentDidMount = () => {
    this.props.loadDictionaries();
  }

  state = {
    dictionaryId: 0,
    studyStarted: false,
    currentSlideIndex: 0,
    isLastSlide: false,
    showResults: false,
    results: {}
  }

  next = () => this.refs.slider.slickNext()

  previous = () => this.refs.slider.slickPrev()

  startStudy = () => {
    this.setState({
      studyStarted: true,
      isLastSlide: false,
      currentSlideIndex: 0,
      showResults: false,
      results: {}
    });

    this.props.startStudy(this.state.dictionaryId);
  }

  finishStudy = () => {
    if (this.state.isLastSlide ||
       (!this.state.isLastSlide && confirm(tr('Do you want to end studying now?'), tr('Confirm early finish')))
    ) {
      this.setState({studyStarted: false, showResults: true})
      this.props.finishStudy(this.state.results);
    }
  }

  afterSlideChange = (currentSlide) => {
    this.setState({
      currentSlideIndex: currentSlide,
      isLastSlide: currentSlide == Object.keys(this.props.studyDefinitions).length - 1
    });
  }

  onCardMarked = (definition) => {
    this.setState({results: Object.assign({}, this.state.results, {[definition.id]: definition.isCorrect})})
    // if timeout is not set, it slides without animation
    setTimeout(() => this.next(), 0);      
  }

  studyFinished = () => {
    return this.state.isLastSlide && 
    typeof this.state.results[this.props.definitions[this.props.definitions.length-1].id] == 'boolean';
  }

  changeSelectedDictionary = (dictionaryId: number) => this.setState({ dictionaryId })

  render() {
    const { studyDefinitions } = this.props;
    const studyDefinitionsIds = Object.keys(studyDefinitions);

    return (
      <DocumentTitle title={tr('Cevirgec › Study')}>
        <div>
          <FlipCardFullWidthStyle />

            <DefinitionSourceDictionarySelector
              dictionaries={this.props.dictionaries}
              onSelectedDictionaryChange={this.changeSelectedDictionary}
            />

            <div style={{maxWidth: '800px',margin: 'auto'}}>
            {
              this.state.studyStarted ? (studyDefinitions.error ? <h3>{studyDefinitions.error}</h3> :
                [<Segment padded attached key='flipCardsContainerSegment'>
                  <Label attached='top'>
                    {tr('Study Your Words')}
                    <span style={{float: 'right'}}>{this.state.currentSlideIndex + 1}/{studyDefinitionsIds.length}</span>
                  </Label>
                  
                  {studyDefinitionsIds.length && <Slider {...settings} afterChange={this.afterSlideChange} ref='slider'>
                    {studyDefinitionsIds.map((definitionId, index) => (
                      <div style={{height: '170px', padding: '0 15px'}} key={definitionId + '_' + index}>
                        <StudyCardForSlider
                          onMark={this.onCardMarked}
                          definition={studyDefinitions[definitionId]}
                          isCorrect={true}
                        />
                      </div>
                    ))}
                  </Slider>}
                  
                </Segment>,
                <Button.Group attached='bottom' key='buttonGroup'>
                  {/**<Button onClick={this.previous} icon='left arrow' labelPosition='left' content={tr('Previous')} />}
                  <Button onClick={this.next} icon='arrow right' labelPosition='right' content={tr('Next')} /> **/}
                  <Button onClick={this.next} icon='arrow right' labelPosition='right' content={tr('Skip')} />
                </Button.Group>]
              ) : null
            }
            </div>

            <Segment basic className='no-padding'>
              {
                this.state.studyStarted && !studyDefinitions.error ?
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
                  definitions={this.props.studyDefinitions}
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
  studyDefinitions: state.study.study,
  definitions: Array(5).fill().map(() => ({id: Math.ceil(Math.random()*1000)}))
})

const mapDispatchToProps = dispatch => {
  const dictionaryActions = bindActionCreators(DictionaryActions, dispatch);
  const studyActions = bindActionCreators(StudyActions, dispatch);

  return {
    loadDictionaries: dictionaryActions.loadDictionaries,
    startStudy: studyActions.startStudy,
    finishStudy: studyActions.finishStudy
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Study)
