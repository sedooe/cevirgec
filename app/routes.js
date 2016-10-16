// @flow
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';
import CounterPage from './containers/CounterPage';
import Dashboard from './containers/Dashboard';
import Dictionaries from './containers/Dictionaries';


export default (
  <Route name="Dashboard" path="/" component={App}>
    <IndexRoute component={Dashboard} />
    <Route name="Counter" path="/counter" component={CounterPage} />
    <Route name="Dictionaries" path="/dictionaries" component={Dictionaries} />
  </Route>
);
