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
    dictionaries: React.PropTypes.object.isRequired,
    selectedDictionaryId: React.PropTypes.number,
    onSelectedDictionaryChange: React.PropTypes.func.isRequired
  };

  handleChange = (event, inputObject) => {
    this.props.onSelectedDictionaryChange(parseInt(inputObject.value));
  }

  render() {
    const { dictionaries } = this.props;

    const options = [];
    Object.keys(dictionaries).forEach(key => {
      options.push({ text: dictionaries[key].name, value: key });
    });

    return (
      options.length ?
        <Segment>
          <Form>
            <Form.Select fluid search selection
              label={tr('Selected Dictionary')} 
              name='selectedDictionaries' 
              options={options}
              onChange={this.handleChange}
            />
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
