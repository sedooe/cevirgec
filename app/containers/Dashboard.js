/* Copyright (c) 2015 Kod Gemisi Ltd.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DocumentTitle from 'react-document-title';
import { Link } from 'react-router';
import tr from '../utils/Translation';
import './Dashboard.scss';
import { Card, Dropdown, Grid, Icon, Menu } from 'semantic-ui-react';
import * as UserActions from '../actions/user';


class Dashboard extends Component {

  componentDidMount() {
    let user = localStorage.getItem('user');
    user = JSON.parse(user);
    this.props.loadUser(user);
  }

  render() {

    if (!this.props.user) {
      return null;
    }

    const trigger = (
      <span>
        <Icon name="user" />
        {tr('Hello, ', this.props.user.username)}
      </span>
    );

    return (
      <DocumentTitle title={tr('Cevirgec › Dashboard')}>
        <div className="child-1st-no-top-margin">

          <Menu text>
            <Menu.Item position="right">
              <Dropdown trigger={trigger}>
                <Dropdown.Menu style={{ margin: '10px 0 0 -81px' }}>
                  <Dropdown.Item disabled>
                    Signed in as <strong>{this.props.user.fullname}</strong>
                  </Dropdown.Item>
                  <Dropdown.Divider style={{margin: 0}} />
                  <Dropdown.Item>
                    <Link to="/user/profile" className="item">
                      <Icon name="user" />
                      {this.props.user.fullname}
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link to="/user/profile" query={{ menuLink: 'edit' }} className="item">
                      <Icon name="edit" />
                      <span>Update Info</span>
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link to="/user/profile" query={{ menuLink: 'account-settings' }} className="item">
                      <Icon name="setting" />
                      <span>Account Settings</span>
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link to="" query={{ menuLink: 'sync' }} onClick={this.sync} className="item">
                      <Icon name="refresh" />
                      <span>Sync My Data</span>
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link to="" query={{ menuLink: 'logout' }} onClick={this.props.logout} className="item">
                      <Icon name="sign out" />
                      <span>Logout</span>
                    </Link>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Item>
          </Menu>

          <dashboard>
            <Grid columns={4}>
              <Grid.Column textAlign="center">
                <Card>
                  <Link to="/dictionaries" className="content">
                    <Icon name="book" />
                  </Link>
                  <Card.Content>
                    <Card.Header>
                      {tr('Dictionaries')}
                    </Card.Header>
                  </Card.Content>
                </Card>
              </Grid.Column>

              <Grid.Column textAlign="center">
                <Card>
                  <Link to="/study" className="content">
                    <Icon name="student" />
                  </Link>
                  <Card.Content>
                    <Card.Header>
                      {tr('Study')}
                    </Card.Header>
                  </Card.Content>
                </Card>
              </Grid.Column>

              <Grid.Column textAlign="center">
                <Card>
                  <Link to="/quiz" className="content">
                    <Icon name="file" />
                  </Link>
                  <Card.Content>
                    <Card.Header>
                      {tr('Quiz')}
                    </Card.Header>
                  </Card.Content>
                </Card>
              </Grid.Column>

              <Grid.Column textAlign="center">
                <Card>
                  <Link to="/online-sources" className="content">
                    <Icon name="browser" />
                  </Link>
                  <Card.Content>
                    <Card.Header>
                      {tr('Online Sources')}
                    </Card.Header>
                  </Card.Content>
                </Card>
              </Grid.Column>

              <Grid.Column textAlign="center">
                <Card>
                  <Link to="/market" className="content">
                    <Icon name="shop" />
                  </Link>
                  <Card.Content>
                    <Card.Header>
                      {tr('Market')}
                    </Card.Header>
                  </Card.Content>
                </Card>
              </Grid.Column>

              <Grid.Column textAlign="center">
                <Card>
                  <Link to="/settings" className="content">
                    <Icon name="settings" />
                  </Link>
                  <Card.Content>
                    <Card.Header>
                      {tr('Settings')}
                    </Card.Header>
                  </Card.Content>
                </Card>
              </Grid.Column>

              <Grid.Column textAlign="center">
                <Card>
                  <Link to="/user" className="content">
                    <Icon name="user" />
                  </Link>
                  <Card.Content>
                    <Card.Header>
                      {tr('User')}
                    </Card.Header>
                  </Card.Content>
                </Card>
              </Grid.Column>

              <Grid.Column textAlign="center">
                <Card>
                  <Link to="/help" className="content">
                    <Icon name="help" />
                  </Link>
                  <Card.Content>
                    <Card.Header>
                      {tr('Help')}
                    </Card.Header>
                  </Card.Content>
                </Card>
              </Grid.Column>
            </Grid>
          </dashboard>

        </div>
      </DocumentTitle>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.user
})

const mapDispatchToProps = dispatch => {
  const actions = bindActionCreators(UserActions, dispatch);
  const { loadUser, logout } = actions;
  return {
    loadUser,
    logout
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
