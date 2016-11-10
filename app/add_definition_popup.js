'use strict';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import NewDefinitionWindow from './containers/NewDefinitionWindow';

import './index.scss';

// enable all debug logs https://github.com/visionmedia/debug#browser-support
localStorage.debug = '*';

const store = configureStore();

render(
  <Provider store={store}>
    <NewDefinitionWindow />
  </Provider>,
  document.getElementById('popup')
);
