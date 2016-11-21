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

import * as UserActions from './actions/user';

const dbActions = [
  actions.DICTIONARIES_LOADED,
  actions.DICTIONARY_CREATED,
  actions.DICTIONARY_EDITED,
  actions.DICTIONARY_ACTIVENESS_CHANGED,
  actions.DICTIONARY_DELETED,
  actions.REGISTER_SUCCESS_LOCALDB,
  actions.REGISTER_FAIL_LOCALDB,
  actions.ONLINE_SOURCES_LOADED,
  actions.ONLINE_SOURCE_CREATED,
  actions.ONLINE_SOURCE_EDITED
];

dbActions.forEach(action => {
  ipc.on(action, (event, data, additionalData) => {

    //FIXME: it's getting uglier to handle these db callbacks here
    if (action == actions.REGISTER_SUCCESS_LOCALDB) {
      store.dispatch(UserActions.loginSuccess(data, additionalData));
    }
    else {
      store.dispatch({ type: action, data, additionalData });
    }
  });
});

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('root')
);
