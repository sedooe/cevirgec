import React, { Component } from 'react'
import { Button, Dropdown, Icon, Image, Form, Modal, Segment } from 'semantic-ui-react'
import tr from '../app/utils/Translation';

const verticallyCenteredTextStyle = {
  display: 'inline-flex',
  alignItems: 'center'
}

const verticallyCenteredContainerStyle = {
  display: 'flex',
  justifyContent: 'space-between'
}

class ActiveDictionarySelector extends Component {

  static propTypes = {
    dictionaries: React.PropTypes.array.isRequired,
    activeDictionaryIds: React.PropTypes.array.isRequired,
    onActiveDictionariesChanged: React.PropTypes.func
  };

  render() {

    if (!this.props.dictionaries.length) {
      return (
        // <main className="ui container">
        <Segment>
          <Segment basic style={verticallyCenteredContainerStyle}>
            <span style={verticallyCenteredTextStyle}>{tr('You have no dictionaries')}</span>
            <Button content={tr('Add a dictionary')} icon='plus' floated='right' />
          </Segment>
        </Segment>
        // </main>
      );
    }

    return (
      // <main className="ui container">

      <Segment>
        <Form>
          <Form.Select label={tr('Active Dictionaries')} name='activeDictionaries' options={this.props.dictionaries} fluid multiple search selection />
          <Button content={tr('Clear All')} icon='trash'/>
          <Button content={tr('Select All')} icon='checkmark'/>
        </Form>
      </Segment>

      // </main>
    )
  }
}

export default ActiveDictionarySelector;
