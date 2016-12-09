'use strict';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/newDefinitionWindow/configureStore';
import NewDefinitionWindow from './containers/NewDefinitionWindow';
import './index.scss';
import { listenDbEventsForNewDefWindow as listenDbEvents } from './actions/databaseCallbacks';

const store = configureStore();

listenDbEvents(store);

render(
  <Provider store={store}>
    <NewDefinitionWindow />
  </Provider>,
  document.getElementById('popup')
);
