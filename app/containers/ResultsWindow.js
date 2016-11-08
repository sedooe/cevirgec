/* Copyright (c) 2016 Kod Gemisi Ltd.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';

import React, {Component} from 'react';
import ResultList from '../components/results/ResultList';
import tr from '../utils/Translation';
import debug from 'debug';
const ipc = require("electron").ipcRenderer;
const logger = debug('ResultsWindow');

const TIMEOUT = 5000;

const mainStyle = {
  height: '100%',
  padding: 0
};
const headerStyle = {
  display: 'inline',
  marginLeft: '5px'
};
const currentWordStyle = {
  backgroundColor: '#eee',
  border: '1px solid #aaa',
  padding: '3px',
  borderRadius: '3px'
};
const containerStyle = {
  maxHeight: '300px',
  overflow: 'auto',
  width: '100%',
  padding: 0
};

export default class ResultsWindow extends Component {
  progressElement = null;
  containerElement = null;

  static propTypes = {
    selectedText: React.PropTypes.string.isRequired,
    results: React.PropTypes.array.isRequired
  };

  constructor() {
    super();
    this.state = {userEngaged: false};

    this.openAddDefinitionWindow = this.openAddDefinitionWindow.bind(this);

    logger('constructor:state', this.state);

    jQuery('body').click(this.onUserEngaged.bind(this));
  }

  componentDidMount() {
    jQuery(this.containerElement).scroll(this.onUserEngaged.bind(this));
    this.startTimer();
  }

  render() {
    return (
      <div className="ui segment" style={mainStyle}>

        {
          !this.state.userEngaged ?
          (<div className="ui top attached orange progress" ref={c => {this.progressElement = c}}>
              <div className="bar"></div>
            </div>) : null
        }

        <button className="mini ui right floated red icon button" onClick={this.closeWindow}>
          <i className="remove icon"/>
        </button>
        {
          this.props.results.length ?
          <button className="mini ui right floated blue icon button" onClick={this.openAddDefinitionWindow}>
            <i className="plus icon"></i>
          </button>
          :
          null
        }
        <h3 className="ui header" style={headerStyle}>{this.props.selectedText}</h3>

        <div className="ui basic segment" style={containerStyle} ref={c => {this.containerElement = c}}>
          {
            this.props.results.length ?
            <ResultList definitions={this.props.results} />
            :
            <div className="ui center aligned basic segment">
              <p style={{color: '#555'}}>{tr('You have no saved meaning for ')} <br/> <br/>  <strong style={currentWordStyle}>{this.props.selectedText}</strong> </p>
              <p style={{color: '#eee'}}><i className="massive frown icon"></i></p>
              <button className="ui primary button" onClick={this.openAddDefinitionWindow}>{tr('Find meaning for this word')}</button>
            </div>
          }
        </div>
      </div>
    );
  }

  startTimer() {
    const that = this;
    const startTime = (new Date()).getTime();
    let intervalHandler = setInterval(()=>{

      if(that.state.userEngaged || !that.progressElement) {
        clearInterval(intervalHandler);
        return;
      }

      let timeElapsed = (new Date()).getTime() - startTime;
      let percent = timeElapsed / TIMEOUT * 100;

      percent = percent > 100 ? 100 : percent;

      jQuery(that.progressElement).progress({percent: percent, limitValues: true, onSuccess: ()=>{
        // allow animations to be completed
        setTimeout( ()=>{
          if(!that.state.userEngaged) {
            that.closeWindow();
            clearInterval(intervalHandler);
            logger('time is up');
          }
        } , 1000);
      }});

    }, TIMEOUT / 100);
  }

  closeWindow() {
    window.close();
  }

  onUserEngaged() {
    this.setState({userEngaged: true});
    jQuery('body').off('click');
    //jQuery(this.containerElement).off('scroll');
  }

  openAddDefinitionWindow() {
    ipc.send('UiEvents.OPEN_NEW_DEFINITION_WINDOW_FOR_WORD', this.props.selectedText);
    window.close();
  }
}
