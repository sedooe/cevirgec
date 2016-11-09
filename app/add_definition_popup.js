'use strict';

import React from 'react';
import { render } from 'react-dom';
import NewDefinitionWindow from './containers/NewDefinitionWindow';

// enable all debug logs https://github.com/visionmedia/debug#browser-support
localStorage.debug = '*';

render(
  <NewDefinitionWindow />,
  document.getElementById('popup')
);
