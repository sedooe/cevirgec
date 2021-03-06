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
    dictionaries: React.PropTypes.object.isRequired,
    activeDictionaryIds: React.PropTypes.array.isRequired,
    onAddDictionary: React.PropTypes.func.isRequired,
    onSelectAll: React.PropTypes.func.isRequired,
    onClearAll: React.PropTypes.func.isRequired,
    onActiveDictionariesChange: React.PropTypes.func
  };

  onClearAll = event => {
    event.preventDefault();
    this.props.onClearAll();
  }

  onSelectAll = event => {
    event.preventDefault();
    this.props.onSelectAll(this.props.dictionaries);
  }

  handleChange = (event, inputObject) => {
    this.props.onActiveDictionariesChange(inputObject.value, this.props.dictionaries);
  }

  render() {
    const { dictionaries } = this.props;

    const options = [];
    Object.keys(dictionaries).forEach(key => {
      options.push({ text: dictionaries[key].name, value: key });
    });

    const dropdown = (
      <Segment>
        <Form>
          <Form.Select fluid multiple search selection
            label={tr('Active Dictionaries')} 
            name='activeDictionaries'
            options={options}
            value={this.props.activeDictionaryIds}
            onChange={this.handleChange}
          />
          <Button content={tr('Clear All')} icon='trash' onClick={this.onClearAll} />
          <Button content={tr('Select All')} icon='checkmark' onClick={this.onSelectAll} />
        </Form>
      </Segment>
    );

    const noDictionary = (
      <Segment>
        <Segment basic style={verticallyCenteredContainerStyle}>
          <span style={verticallyCenteredTextStyle}>{tr('You have no dictionaries')}</span>
          <Button content={tr('Add a dictionary')} icon='plus' floated='right' onClick={this.props.onAddDictionary} />
        </Segment>
      </Segment>
    );

    return Object.keys(dictionaries).length ? dropdown : noDictionary;
  }
}
