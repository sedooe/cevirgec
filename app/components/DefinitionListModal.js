// @flow
import React, { Component, PropTypes } from 'react';
import { Button, Checkbox, Form, Icon, Modal } from 'semantic-ui-react';
import tr from '../utils/Translation';

class DefinitionListModal extends Component {

  componentDidMount = () => {
    this.props.loadDefinitions(this.props.dictionary.id);
  }

  render() {
    console.log(this.props.definitions);

    return (
      <Modal closeIcon open={this.props.open} onClose={this.props.onHide}>
        <Modal.Header>
          Definitions for {this.props.dictionary.name}
        </Modal.Header>
        <Modal.Content>
      
        </Modal.Content>
      </Modal>
    );
  }
}

DefinitionListModal.propTypes = {
  open: PropTypes.bool.isRequired,
  loadDefinitions: PropTypes.func.isRequired,
  definitions: PropTypes.array.isRequired,  
  onHide: PropTypes.func.isRequired,
  dictionary: PropTypes.object.isRequired
};

export default DefinitionListModal
