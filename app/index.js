// @flow
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import routes from './routes';
import configureStore from './store/app/configureStore';
import './index.scss';
import { listenDbEvents } from './actions/databaseCallbacks';

const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store);

listenDbEvents(store);

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('root')
);
