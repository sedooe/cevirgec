// @flow
import React, { Component, PropTypes } from 'react';
import { Button, Checkbox, Form, List, Icon, Modal } from 'semantic-ui-react';
import tr from '../utils/Translation';

class DefinitionListModal extends Component {

  componentDidMount = () => {
    this.props.loadDefinitions(this.props.dictionary.id);
  }

  iconValue = (sex: string) => {
    switch (sex) {
      case 'MASCULINE':
        return 'man';
      case 'FEMININE':
        return 'woman';
      default:
        return 'neuter';
    }
  }

  render() {
    const { dictionary } = this.props;

    if (typeof dictionary.definitions === 'undefined') {
      return (
        <div>Loading...</div>
      );
    }

    const definitions = dictionary.definitions.map(definition => (
      <List.Item>
        <List.Content floated="right">
          <Button primary size="tiny" icon="edit" />
        </List.Content>
        <List.Content>
          <Icon name={this.iconValue(definition.sex)} />
          <em>n.&nbsp;</em>  {/* FIXME: use real value of it. noun, verb, phrase etc. */}
          <span><b>{definition.value}</b></span>
        </List.Content>
        <List.List>
          {definition.value ? <List.Item><i>Meaning: </i>{definition.value}</List.Item> : null}
          {definition.usage ? <List.Item><i>Usage: </i>{definition.usage}</List.Item> : null}
          {definition.notes ? <List.Item><i>Notes: </i>{definition.notes}</List.Item> : null}
        </List.List>
      </List.Item>
    ));

    return (
      <Modal closeIcon open={this.props.open} onClose={this.props.onHide}>
        <Modal.Header>
          Definitions for {dictionary.name}
        </Modal.Header>
        <Modal.Content>
          <List celled>
            {definitions}
          </List>
        </Modal.Content>
      </Modal>
    );
  }
}

DefinitionListModal.propTypes = {
  open: PropTypes.bool.isRequired,
  loadDefinitions: PropTypes.func.isRequired,
  onHide: PropTypes.func.isRequired,
  dictionary: PropTypes.object.isRequired
};

export default DefinitionListModal
