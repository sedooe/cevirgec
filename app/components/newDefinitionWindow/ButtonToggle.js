import React, { Component } from 'react';
import {Button} from 'semantic-ui-react';
import tr from '../../utils/Translation';

export default class ButtonToggle extends Component {
  state = {}

  handleClick = () => {
    this.setState({ active: !this.state.active });
    if (typeof this.props.onToggle == 'function') {
      this.props.onToggle(!this.state.active);
    }
  }

  render() {
    const { active } = this.state;

    // otherwise on toToggle gives error
    // https://facebook.github.io/react/warnings/unknown-prop.html
    const { onToggle, ...rest } = this.props;
    return (
      <Button {...rest} active={active} onClick={this.handleClick}>
        {this.children}
      </Button>
    )
  }
}

ButtonToggle.propTypes = {
  onToggle: React.PropTypes.func
};
