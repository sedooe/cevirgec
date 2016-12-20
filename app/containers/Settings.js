// @flow

import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Grid, Menu, Segment } from 'semantic-ui-react';
import tr from '../utils/Translation';
import * as SettingsActions from '../actions/settings';
import SideMenu from '../components/SideMenu';

class Settings extends Component {

  componentDidMount() {
    this.props.loadAllSettings();
  }

  render() {

    // Thanks http://stackoverflow.com/a/32371612/878361
    const childrenWithProps = React.Children.map(this.props.children, child => (
      React.cloneElement(child, this.props[child.type.name.toLowerCase()])
    ));

    return (
      <DocumentTitle title={tr('Cevirgec › Settings')}>
        <Segment basic className="no-padding">
          <Grid>
            <Grid.Column width={3}>
              <SideMenu />
            </Grid.Column>
            <Grid.Column width={13} style={{'paddingLeft': 0}}>
              <section>{childrenWithProps}</section>
            </Grid.Column>
          </Grid>
        </Segment>
      </DocumentTitle>
    );
  }
}

const mapStateToProps = state => ({
  settings: state.settings.settings
})

const mapDispatchToProps = dispatch => {
  const actions = bindActionCreators(SettingsActions, dispatch);

  return {
    loadAllSettings: actions.loadAllSettings,
    options: {  // options: child component name
      changeVerbosity: actions.changeVerbosity
    }
  };
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { settings } = stateProps;
  const mergedOptionsProps = {
    ...dispatchProps,
    options: {
      ...dispatchProps.options,
      verbose: settings.verbose
    }
  };
  return Object.assign({}, ownProps, stateProps, mergedOptionsProps);
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Settings);
