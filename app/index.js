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

ipc.on(actions.DICTIONARY_CREATED, (event, dictionary) => {
  store.dispatch({type: actions.DICTIONARY_CREATED, dictionary})
})

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('root')
);
