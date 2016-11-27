// @flow
import React from 'react';
import { Route, IndexRoute, IndexRedirect } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';
import Dashboard from './containers/Dashboard';
import Dictionaries from './containers/Dictionaries';
import OnlineSources from './containers/OnlineSources';
import User from './containers/User';
import Study from './containers/Study';
import Quiz from './containers/Quiz';
import Help from './containers/Help';
import Register from './components/Register';
import Login from './components/Login';


// Taken from https://github.com/ReactTraining/react-router/blob/cbd1a95b2d9a75febb3eb58d2f9d5a513e432540/examples/auth-flow/app.js#L120
function requireAuth(nextState, replace) {
  if ( !localStorage.getItem('user') || !localStorage.getItem('token') ) {
    replace({
      pathname: '/user/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

export default (
  <Route name="Dashboard" path="/" component={App}>
    <IndexRoute component={Dashboard} onEnter={requireAuth} />
    <Route name="Dictionaries" path="/dictionaries" component={Dictionaries} onEnter={requireAuth} />
    <Route name="OnlineSources" path="/online-sources" component={OnlineSources} onEnter={requireAuth} />
    <Route name="Study" path="/study" component={Study} onEnter={requireAuth} />
    <Route name="Quiz" path="/quiz" component={Quiz} onEnter={requireAuth} />
    <Route name="User" path="/user" component={User}>
      <IndexRedirect to="register" />
      <Route path="register" component={Register} name="Register" />
      <Route path="login" component={Login} name="Login" />
    </Route>
    <Route name="Help" path="/help" component={Help} onEnter={requireAuth} />
  </Route>
);
