import React, { Component } from 'react';
import {Button, Menu, Message, Segment } from 'semantic-ui-react';
import tr from '../../utils/Translation';
import WordBrowser from './WordBrowser';

const NoDictWarning = ({onAddOnlineSource}) => (
  <Segment style={{display:'flex', flexDirection: 'column', flexGrow: 1}} className='full-height'>
    <Message>
      <span style={{lineHeight: '36px'}}>{tr('You have no relevant Online Dictionary for this source language.')}</span>
      <Button
        icon='plus'
        floated='right'
        content={tr('Add an online dictionary')}
        onClick={onAddOnlineSource}
      />
    </Message>
  </Segment>
)

export default class OnlineDictionariesTabView extends Component {
  state = {
    activeTabIndex: 0
  }

  setActiveTab = (newIndex) => this.setState({activeTabIndex: newIndex})

  render() {
    const { onlineSources } = this.props;

    if (!Object.keys(onlineSources).length) {
      return <NoDictWarning onAddOnlineSource={this.props.onAddOnlineSource} />
    }

    const title = Object.keys(onlineSources).map((key, index) => {
      return <Menu.Item
                key={key}
                name={onlineSources[key].name}
                active={index == this.state.activeTabIndex}
                onClick={() => this.setActiveTab(index)}
              />
    });

    const content = Object.keys(onlineSources).map((key, index) => {
      let url = new URL(onlineSources[key].url);
      if (this.props.currentWord) {
        url = url.href.replace('abcxyz', this.props.currentWord);
      } else {
        url = url.origin;
      }
      return <WordBrowser key={key} url={url} active={index == this.state.activeTabIndex} />
    });

    return (
      <span style={{display:'flex', flexDirection: 'column', flexGrow: 1}} className='full-height'>
        <Menu attached='top' tabular>
          {title}
        </Menu>

        <Segment attached='bottom' style={{display:'flex', flexDirection: 'column', flexGrow: 1}}>
          {content}
        </Segment>
      </span>
    );
  }
}

OnlineDictionariesTabView.propTypes = {
  onlineSources: React.PropTypes.object.isRequired,
  onAddOnlineSource: React.PropTypes.func.isRequired,
  currentWord: React.PropTypes.string.isRequired
}
