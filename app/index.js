// @flow
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import routes from './routes';
import configureStore from './store/app/configureStore';
import './app.global.css';
import './index.scss';
import * as UserActions from './actions/user';
import { REGISTER_SUCCESS_LOCALDB } from './actions/constants/user';
import { dbCallbacks }  from './actions/databaseCallbacks';
const ipc = require('electron').ipcRenderer;

const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store);

dbCallbacks.forEach(action => {
  ipc.on(action, (event, data, additionalData) => {

    //FIXME: it's getting uglier to handle these db callbacks here
    if (action == REGISTER_SUCCESS_LOCALDB) {
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
