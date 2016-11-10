import React, { Component } from 'react'
import { Button, Dropdown, Icon, Image, Form, Modal, Segment } from 'semantic-ui-react'
import tr from '../../utils/Translation';

const verticallyCenteredTextStyle = {
  display: 'inline-flex',
  alignItems: 'center'
}

const verticallyCenteredContainerStyle = {
  display: 'flex',
  justifyContent: 'space-between'
}

export default class ActiveDictionarySelector extends Component {

  static propTypes = {
    dictionaries: React.PropTypes.array.isRequired,
    activeDictionaryIds: React.PropTypes.array.isRequired,
    onAddDictionary: React.PropTypes.func.isRequired,
    onActiveDictionariesChanged: React.PropTypes.func
  };

  render() {

    return (
      this.props.dictionaries.length ?
        <Segment>
          <Form>
            <Form.Select label={tr('Active Dictionaries')} name='activeDictionaries' options={this.props.dictionaries} fluid multiple search selection />
            <Button content={tr('Clear All')} icon='trash'/>
            <Button content={tr('Select All')} icon='checkmark'/>
          </Form>
        </Segment>
      :
        <Segment>
          <Segment basic style={verticallyCenteredContainerStyle}>
            <span style={verticallyCenteredTextStyle}>{tr('You have no dictionaries')}</span>
            <Button content={tr('Add a dictionary')} icon='plus' floated='right' onClick={this.props.onAddDictionary} />
          </Segment>
        </Segment>
    );
  }
}
