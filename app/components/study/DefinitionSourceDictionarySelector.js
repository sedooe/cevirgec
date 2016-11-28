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

export default class DefinitionSourceDictionarySelector extends Component {

  static propTypes = {
    dictionaries: React.PropTypes.array.isRequired,
    selectedDictionaryId: React.PropTypes.number,
    onSelectedDictionaryChanged: React.PropTypes.func.isRequired
  };

  render() {

    return (
      this.props.dictionaries.length ?
        <Segment>
          <Form>
            <Form.Select label={tr('Selected Dictionary')} name='selectedDictionaries' options={this.props.dictionaries} fluid search selection />
            {/**
              <Button content={tr('Clear All')} icon='trash'/>
              <Button content={tr('Select All')} icon='checkmark'/>
            **/}
          </Form>
        </Segment>
      :
        <Segment>
          <Segment basic style={verticallyCenteredContainerStyle}>
            <span style={verticallyCenteredTextStyle}>{tr('You have no dictionaries')}</span>
          </Segment>
        </Segment>
    );
  }
}
