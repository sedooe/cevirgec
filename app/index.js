// @flow
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import routes from './routes';
import configureStore from './store/configureStore';
import './app.global.css';
import './index.scss';
import * as actions from './actions/constants';
const ipc = require('electron').ipcRenderer;

const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store);

const dbActions = [
  actions.DICTIONARIES_LOADED,
  actions.DICTIONARY_CREATED,
  actions.DICTIONARY_EDITED,  
  actions.DICTIONARY_ACTIVENESS_CHANGED,
  actions.DICTIONARY_DELETED
];

dbActions.forEach(action => {
  ipc.on(action, (event, data) => {
    store.dispatch({ type: action, data });
  });
});

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('root')
);
