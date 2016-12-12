import React, { Component } from 'react';
import {Button, Icon, Input } from 'semantic-ui-react';
import tr from '../../utils/Translation';

/*
  Actual stylesheet:
  use following regEx to make it one liner: \s{2,}|\n

  #cevirgecCopyPopup {
    border: 1px solid #333;
    position: absolute;
    font-family: Helvetica;
    border-radius: 0px 5px 0px 5px;
    background-color: #DB4814;
    color: white;
    cursor: pointer;
    z-index: 1000;
  }

  #cevirgecCopyPopup > hr {
    border-top: 1px solid whiteSmoke;
    border-bottom: 0;
    padding: 0;
    margin: 0;
  }

  .cevirgecCopyPopupButton {
    padding: 5px;
  }

  .cevirgecCopyPopupButton:hover{
    background-color: #DB6B14;
  }

  #cevirgecCopyPopupTitle {
    background-color: #ebebf2;
    color: #124b94;
    padding: 5px;
    border-radius: 0px 4px 0px 0px;
  }
​
*/
function insertCevirgecCopySuggestionWhenDocumentReady(document, window, callback) {
  var intervalId = setInterval(function() {
    if(typeof document !== 'object'){
      /*
      document.readyState !== 'complete'
      don't do this check, we don't need external css or other sources
      */
      return;
    }
    clearInterval(intervalId);
    //do actual work beyond this point

    !function createCevirgecStyle() {
      var style = document.createElement('style');
      style.innerHTML = '#cevirgecCopyPopup {border: 1px solid #333;position: absolute;font-family: Helvetica;border-radius: 0px 5px 0px 5px;background-color: #DB4814;color: white;cursor: pointer;z-index: 1000;}#cevirgecCopyPopup > hr {border-top: 1px solid whiteSmoke;border-bottom: 0;padding: 0;margin: 0;}.cevirgecCopyPopupButton {padding: 5px;}.cevirgecCopyPopupButton:hover{background-color: #DB6B14;}#cevirgecCopyPopupTitle {background-color: #ebebf2;color: #124b94;padding: 5px;border-radius: 0px 4px 0px 0px;}';
      document.head.appendChild(style);
    }();

    !function insertCevirgecCopySuggestion() {
      var isSelectionValid = false;
      var isShown = false;
      var isLocked = false;
      var x, y;
      var selectedString;

      function showCopySuggestion(e) {
        isSelectionValid = !!window.getSelection().toString().trim();

        if (isSelectionValid) {
          selectedString = window.getSelection().toString().trim();
          showPopup();
        }
      }

      function createPopup() {
        var div = document.createElement('div');
        div.id = 'cevirgecCopyPopup';
        div.innerHTML = '<div id="cevirgecCopyPopupTitle"></div><hr><div id="cevirgecCopyPopupSet" class="cevirgecCopyPopupButton">Use this as definition</div>';
        div.onmouseover = function(e) {
          isLocked = true;
        };
        div.onmouseout = function(e) {
          isLocked = false;
        };

        document.body.appendChild(div);//Should be called before onclick bindings

        //onclick bindings
        var divSetter = document.getElementById('cevirgecCopyPopupSet');
        divSetter.onclick = sendMeaningToWindow;
      }

      function showPopup() {
        if (!isShown && !isLocked) {
          if (isSelectionValid && document.getElementById('cevirgecCopyPopup') === null) {
            createPopup();
          }
          var div = document.getElementById('cevirgecCopyPopup');

          div.style.display = 'block';
          div.style.left = x + "px";
          div.style.top = y + "px";
          div.querySelector('#cevirgecCopyPopupTitle').innerHTML = selectedString;
          isShown = true;
        }
      }

      function hidePopup() {
        if (!isLocked && document.getElementById('cevirgecCopyPopup') !== null) {
          var div = document.getElementById('cevirgecCopyPopup');
          div.style.display = 'none';
          isShown = false;
        }
      }

      function recordMouse(e) {
        x = e.clientX + document.body.scrollLeft;
        y = e.clientY + document.body.scrollTop + 10; //take it 10px lower in order not to cover selected text
      }

      function sendMeaningToWindow() {
        isLocked = false;
        hidePopup();
        console.log('selectedString', selectedString);
        callback({value: selectedString});
      }

      document.addEventListener('mousemove', recordMouse, false);
      document.addEventListener('mouseup', showCopySuggestion, false);
      document.addEventListener('mousedown', hidePopup, false);
      }();

    }, 300);//300ms is good enough not to rush cpu

  return;
}

const lastSlashRegx=/\/$/;

export default class WordBrowser extends Component {

  state = {
    loading: true
  }

  static propTypes = {
    active: React.PropTypes.bool.isRequired,
    url: React.PropTypes.string.isRequired,
    setCurrentDefinition: React.PropTypes.func.isRequired
  }

  refresh = () => this.iframe.src = this.iframe.contentWindow.location.href;

  goHome = () => this.iframe.src = this.props.url;

  goBack = () => this.iframe.contentWindow.history.back()

  goForward = () => this.iframe.contentWindow.history.forward()

  onLoad = () => {
    this.setState({loading: false})

    insertCevirgecCopySuggestionWhenDocumentReady(this.iframe.contentWindow.document,
                                                  this.iframe.contentWindow.window,
                                                  this.props.setCurrentDefinition);
  }

  componentWillReceiveProps(nextProps) {
    if(this.iframe && this.iframe.src.replace(lastSlashRegx, '') != nextProps.url.replace(lastSlashRegx, '')) {
      console.log('this.iframe.src, nextProps.url', this.iframe.src.replace(lastSlashRegx, ''), nextProps.url.replace(lastSlashRegx, ''));
      this.setState({loading: true});
    }
  }

  render() {
    const display = this.props.active ? 'flex' : 'none';
    return (
      <span style={{display: display, flexDirection: 'column', flexGrow: 1}}>
        <Input fluid style={{marginBottom: '14px'}}>
          <Button.Group>
            <Button icon='arrow left' onClick={this.goBack} />
            <Button icon='arrow right' onClick={this.goForward} />
            <Button icon='refresh' onClick={this.refresh} />
            <Button icon='home' className='no-right-radius' onClick={this.goHome} />
          </Button.Group>
          <div className={'ui fluid icon input full-width ' + (this.state.loading ? 'loading' : '')}>
            <input type="text" className='no-left-radius full-width' value={this.props.url} readOnly />
            <Icon name='checkmark' />
          </div>
        </Input>

        <iframe
          sandbox="allow-forms allow-same-origin allow-scripts"
          onLoad={this.onLoad}
          src={this.props.url}
          style={{width: '100%', border: '1px solid #eee', flexGrow: 1 }}
          ref={c => {this.iframe = c}}>
        </iframe>
      </span>
    )
  }
}
