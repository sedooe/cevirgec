// @flow
import React from 'react';
import { Route, IndexRoute, IndexRedirect } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';
import Dashboard from './containers/Dashboard';
import Dictionaries from './containers/Dictionaries';
import User from './containers/User';
import Register from './components/Register';
import Login from './components/Login';


export default (
  <Route name="Dashboard" path="/" component={App}>
    <IndexRoute component={Dashboard} />
    <Route name="Dictionaries" path="/dictionaries" component={Dictionaries} />
    <Route name="User" path="/user" component={User}>
      <IndexRedirect to="register" />
      <Route path="register" component={Register} name="Register" />
      <Route path="login" component={Login} name="Login" />
    </Route>
  </Route>
);
