import React, { Component } from 'react';
import {Button} from 'semantic-ui-react';
import tr from '../../utils/Translation';

export default class ButtonToggle extends Component {
  state = {}

  handleClick = () => {
    this.setState({ active: !this.state.active });
    if (typeof this.props.onToggle == 'function') {
      this.props.onToggle(!this.state.active);
      console.log('button', !this.state.active);
    }
  }

  render() {
    const { active } = this.state
    return (
      <Button {... this.props} toggle active={active} onClick={this.handleClick}>
        {this.children}
      </Button>
    )
  }
}

ButtonToggle.propTypes = {
  onToggle: React.PropTypes.func
};
