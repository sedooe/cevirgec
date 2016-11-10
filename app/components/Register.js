/* Copyright (c) 2016 Kod Gemisi Ltd.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import { Link } from 'react-router';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';


class Register extends Component {

  register = (event, serializedForm) => {
    event.preventDefault();
    this.props.register(serializedForm);
  }

  render() {
    return (
      <DocumentTitle title="Cevirgec › Register">
        <Grid textAlign="center" columns={3}>
          <Grid.Column>
            <Header
              as="h2"
              color="teal"
              image="http://semantic-ui.com/examples/assets/images/logo.png"
              content="Create an account"
            />

            <Form size="large" onSubmit={this.register}>
              <Segment>
                <Form.Input name="email" placeholder="Email" icon="mail icon" iconPosition="left" />
                <Form.Input name="username" placeholder="Username" icon="user icon" iconPosition="left" />
                <Form.Input name="name" placeholder="Name" icon="user icon" iconPosition="left" />
                <Form.Input name="surname" placeholder="Surname" icon="user icon" iconPosition="left" />
                <Form.Input type="password" name="password" placeholder="Password" icon="lock icon" iconPosition="left" />
                <Form.Input type="password" name="passwordAgain" placeholder="Re-type password" icon="lock icon" iconPosition="left" />
                <Message error />
                <Button size="large" color="teal" content="Register" />
              </Segment>
            </Form>

            <Message>
              Already have an account?
              <Link to="/user/login" className="content">
                &nbsp;Login
              </Link>
            </Message>
          </Grid.Column>
        </Grid>
      </DocumentTitle>
    );
  }
}

export default Register;
