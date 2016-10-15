// @flow
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';
import CounterPage from './containers/CounterPage';
import Dashboard from './containers/Dashboard';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={Dashboard} />
    <Route path="/counter" component={CounterPage} />
  </Route>
);
