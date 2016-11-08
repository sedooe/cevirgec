/* Copyright (c) 2016 Kod Gemisi Ltd.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import { Link } from 'react-router';


class Register extends Component {

  render() {
    return (
      <DocumentTitle title="Cevirgec › Register">
        <div className="ui middle aligned center aligned grid">
          <div className="column">
            <h2 className="ui teal image header">
              <img src="http://semantic-ui.com/examples/assets/images/logo.png" className="image" />
              <div className="content">
                Create an account
              </div>
            </h2>
            <form id="registerForm" className="ui large form">
              <div className="ui segment">
                <div className="field">
                  <div className="ui left icon input">
                    <i className="mail icon"></i>
                    <input type="text" name="email" placeholder="Email" autoFocus />
                  </div>
                </div>
                <div className="field">
                  <div className="ui left icon input">
                    <i className="user icon"></i>
                    <input type="text" name="username" placeholder="Username" />
                  </div>
                </div>
                <div className="field">
                  <div className="ui left icon input">
                    <i className="user icon"></i>
                    <input type="text" name="name" placeholder="Name" />
                  </div>
                </div>
                <div className="field">
                  <div className="ui left icon input">
                    <i className="user icon"></i>
                    <input type="text" name="surname" placeholder="Surname" />
                  </div>
                </div>
                <div className="field">
                  <div className="ui left icon input">
                    <i className="lock icon"></i>
                    <input type="password" name="password" placeholder="Password" />
                  </div>
                </div>
                <div className="field">
                  <div className="ui left icon input">
                    <i className="lock icon"></i>
                    <input type="password" name="passwordAgain" placeholder="Re-type password" />
                  </div>
                </div>
                <div className="ui error message"></div>
                <button className="ui fluid large teal submit button">Register</button>
              </div>
            </form>

            <div className="ui message">
              Already have an account?
              <Link to="/user/login" className="content">
                &nbsp;Sign In
              </Link>
            </div>
          </div>
        </div>
      </DocumentTitle>
    );
  }
}

export default Register