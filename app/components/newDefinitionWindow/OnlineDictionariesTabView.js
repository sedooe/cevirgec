import React, { Component } from 'react';
import {Button, Menu, Message, Segment } from 'semantic-ui-react';
import tr from '../../utils/Translation';
import WordBrowser from './WordBrowser';

const NoDictWarning = ({onAddOnlineDictionary}) => (
  <Segment style={{display:'flex', flexDirection: 'column', flexGrow: 1}} className='full-height'>
    <Message>
      <span style={{lineHeight: '36px'}}>{tr('You have no relevant Online Dictionary for this source language.')}</span>
      <Button content={tr('Add an online dictionary')} icon='plus' floated='right' onClick={onAddOnlineDictionary} />
    </Message>
  </Segment>
)

export default class OnlineDictionariesTabView extends Component {
  state = {
    activeTabIndex: 0
  }

  setActiveTab = (newIndex) => this.setState({activeTabIndex: newIndex})

  render() {
    const that = this;

    if(!this.props.onlineDictionaries.length) {
      console.log(NoDictWarning);
      return <NoDictWarning onAddOnlineDictionary={this.props.onAddOnlineDictionary} />
    }

    let title = this.props.onlineDictionaries.map( (onlineDictionary, index) => {
      return <Menu.Item
                name={onlineDictionary.name}
                active={index == that.state.activeTabIndex}
                onClick={that.setActiveTab.bind(that, index)}
              />
    } );

    let content = this.props.onlineDictionaries.map((onlineDictionary, index) => <WordBrowser url={onlineDictionary.url} active={index == that.state.activeTabIndex} />)

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
  onlineDictionaries: React.PropTypes.array.isRequired,
  onAddOnlineDictionary: React.PropTypes.func.isRequired
}
