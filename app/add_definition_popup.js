'use strict';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/newDefinitionWindow/configureStore';
import NewDefinitionWindow from './containers/NewDefinitionWindow';
import './index.scss';
import { dictionariesAndActiveDictionariesLoaded } from './actions/dictionary';
import { DICTIONARIES_LOADED } from './actions/constants/dictionary';
import { dbCallbacksNewDefWindow }  from './actions/databaseCallbacks';
const ipc = require('electron').ipcRenderer;

const store = configureStore();

dbCallbacksNewDefWindow.forEach(action => {
  ipc.on(action, (event, data) => {
    if (action === DICTIONARIES_LOADED) { //data: dictionaries, type: array -not object!-
      const activeDictionaryIds = [];
      data.forEach(dictionary => {
        if (dictionary.active) {
          activeDictionaryIds.push(dictionary.id.toString());
        }
      });

      store.dispatch(dictionariesAndActiveDictionariesLoaded(data, activeDictionaryIds));
    } else {
      store.dispatch({ type: action, data });          
    }
  })
})

render(
  <Provider store={store}>
    <NewDefinitionWindow />
  </Provider>,
  document.getElementById('popup')
);
