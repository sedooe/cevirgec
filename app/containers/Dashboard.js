/* Copyright (c) 2015 Kod Gemisi Ltd.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';

import React, {Component} from 'react';
import DocumentTitle from 'react-document-title';
import { Link } from 'react-router';
import tr from '../utils/Translation';
import './Dashboard.scss';


export default class Dashboard extends Component {

  render() {
    let user = JSON.parse(window.localStorage.getItem("user")) || {username: 'username', fullname: 'User'};
    // FIXME: hardcoded object is needed for development, we won't need it later.

    return (
      <DocumentTitle title={tr('Cevirgec › Dashboard')}>
        <div>

          <div className="ui text menu" style={{marginTop: 0, marginBottom: 5}}>
            <div className="ui simple right dropdown item">
              <i className="user icon"></i>
              {user.username}
              <i className="dropdown icon"></i>
              <div className="menu" style={{marginTop: -2}}>
                <Link to="/user/profile" className="item">
                  <i className="user icon"></i>
                  {user.fullname}
                </Link>
                <Link to="/user/profile" query={{menuLink: 'edit'}} className="item">
                  <i className="edit icon"></i>
                  <span>Update Info</span>
                </Link>
                <Link to="/user/profile" query={{menuLink: 'account-settings'}} className="item">
                  <i className="setting icon"></i>
                  <span>Account Settings</span>
                </Link>
                <Link to="" query={{menuLink: 'sync'}} onClick={this.sync} className="item">
                <i className="refresh icon"></i>
                <span>Sync My Data</span>
                </Link>
                <Link to="" query={{menuLink: 'logout'}} onClick={this.logout} className="item">
                  <i className="sign out icon"></i>
                  <span>Logout</span>
                </Link>
              </div>
            </div>
          </div>

          <dashboard className="ui four column grid">
            <div className="column center aligned">
              <div className="ui fluid card">
                <Link to="/dictionaries" className="content">
                  <i className="book icon"></i>
                </Link>
                <div className="content">
                  <a className="header">{tr('Dictionaries')}</a>
                </div>
              </div>
            </div>

            <div className="column center aligned">
              <div className="ui fluid card">
                <Link to="/study" className="content">
                  <i className="student icon"></i>
                </Link>
                <div className="content">
                  <a className="header">{tr('Study')}</a>
                </div>
              </div>
            </div>

            <div className="column center aligned">
              <div className="ui fluid card">
                <Link to="/quiz" className="content">
                  <i className="file text outline icon"></i>
                </Link>
                <div className="content">
                  <a className="header">{tr('Quiz')}</a>
                </div>
              </div>
            </div>

            <div className="column center aligned">
              <div className="ui fluid card">
                <Link to="/online-sources" className="content">
                  <i className="browser icon"></i>
                </Link>
                <div className="content">
                  <a className="header">{tr('Online Dictionaries')}</a>
                </div>
              </div>
            </div>

            <div className="column center aligned">
              <div className="ui fluid card">
                <Link to="/market" className="content">
                  <i className="shop icon"></i>
                </Link>
                <div className="content">
                  <a className="header">{tr('Market')}</a>
                </div>
              </div>
            </div>

            <div className="column center aligned">
              <div className="ui fluid card">
                <Link to="/settings" className="content">
                  <i className="settings icon"></i>
                </Link>
                <div className="content">
                  <a className="header">{tr('Settings')}</a>
                </div>
              </div>
            </div>

            <div className="column center aligned">
              <div className="ui fluid card">
                <Link to="/user" className="content">
                  <i className="user icon"></i>
                </Link>
                <div className="content">
                  <a className="header">{tr('User')}</a>
                </div>
              </div>
            </div>

            <div className="column center aligned">
              <div className="ui fluid card">
                <Link to="/help" className="content">
                  <i className="help icon"></i>
                </Link>
                <div className="content">
                  <a className="header">{tr('Help')}</a>
                </div>
              </div>
            </div>
          </dashboard>

        </div>
      </DocumentTitle>
    );
  }
}
