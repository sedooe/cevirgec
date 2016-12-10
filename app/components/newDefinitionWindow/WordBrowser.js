import React, { Component } from 'react';
import {Button, Icon, Input } from 'semantic-ui-react';
import tr from '../../utils/Translation';

export default class WordBrowser extends Component {

  state = {
    loading: true
  }

  refresh = () => this.iframe.src = this.iframe.contentWindow.location.href;

  goHome = () => this.iframe.src = this.props.url;

  goBack = () => this.iframe.contentWindow.history.back()

  goForward = () => this.iframe.contentWindow.history.forward()

  onLoad = () => {
    this.setState({loading: false})

    // inject selection popup script
    this.iframe.contentWindow.document.onselectionchange = function() {
      //TODO
    }
  }

  componentWillReceiveProps(nextProps) {
    if(this.iframe && this.iframe.src != nextProps.url) {
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
            <input type="text" className='no-left-radius full-width' value={this.props.url} />
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
