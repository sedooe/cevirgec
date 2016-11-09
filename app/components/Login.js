/* Copyright (c) 2016 Kod Gemisi Ltd.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import { Link } from 'react-router';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';


class Login extends Component {

  render() {
    return (
      <DocumentTitle title="Cevirgec › Login">
        <Grid textAlign="center" columns={3}>
          <Grid.Column>
            <Header
              as="h2"
              color="teal"
              image="http://semantic-ui.com/examples/assets/images/logo.png"
              content="Login to your account"
            />

            <Form size="large">
              <Segment>
                <Form.Input name="username" placeholder="Username" icon="user icon" iconPosition="left" />
                <Form.Input type="password" name="password" placeholder="Password" icon="lock icon" iconPosition="left" />
                <Message error />
                <Button size="large" color="teal" content="Login" />
              </Segment>
            </Form>

            <Message>
              You don't have an account?
              <Link to="/user/register" className="content">
                &nbsp;Register
              </Link>
            </Message>
          </Grid.Column>
        </Grid>
      </DocumentTitle>
    );
  }
}

export default Login;
