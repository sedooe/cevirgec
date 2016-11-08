'use strict';

import React from 'react';
import { render } from 'react-dom';
import NewDefinitionPopup from './containers/NewDefinitionPopup';

// enable all debug logs https://github.com/visionmedia/debug#browser-support
localStorage.debug = '*';

render(
  <NewDefinitionPopup />,
  document.getElementById('popup')
);
