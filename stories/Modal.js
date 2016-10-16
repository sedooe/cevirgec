import React, { Component } from 'react'
import { Button, Image, Modal, Icon } from 'semantic-ui-react'
import tr from '../app/utils/Translation';

class ModalModalExample extends Component {
  state = {
    open: false,
    saveMode: false
  };

  show = () => {
    this.setState({open: true});
  }

  hide = () => {
    this.setState({open: false, saveMode: !this.state.saveMode});
  }

  render() {
    let headerText = this.state.saveMode ? tr('New Dictionary') : tr('Update Dictionary');

    return (
      <div>
        <Button onClick={this.show}>Show Modal</Button>
        <Modal open={this.state.open}>
          <Modal.Header>{headerText}</Modal.Header>
          <Modal.Content>
            {this.props.children}
            <Modal.Actions>
              <Button color='black' onClick={this.hide.bind(this)}>
                <Icon name='remove' /> No
              </Button>
              <Button positive onClick={this.hide.bind(this)}>
                <Icon name='checkmark' /> Yes
              </Button>
            </Modal.Actions>
          </Modal.Content>
        </Modal>
      </div>
    )
  }
}

export default ModalModalExample
