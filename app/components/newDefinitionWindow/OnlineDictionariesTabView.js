import React, { Component } from 'react';
import {Menu, Segment } from 'semantic-ui-react';
import tr from '../../utils/Translation';
import WordBrowser from './WordBrowser';

export default class OnlineDictionariesTabView extends Component {
  state = {
    activeTabIndex: 0
  }

  setActiveTab = (newIndex) => this.setState({activeTabIndex: newIndex})

  render() {
    const that = this;

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
  onlineDictionaries: React.PropTypes.array.isRequired
}
