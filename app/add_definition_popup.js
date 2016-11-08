'use strict';

import React from 'react';
import { render } from 'react-dom';
import NewDefinitionPopup from './containers/NewDefinitionPopup';

// See https://github.com/atom/electron/issues/254
window.jQuery = window.$ = require('jquery');

// importing this doesn't work because it's executed before
// 'require's and since this is dependant to jQuery application
// breaks. Hence we had to require semantic-ui as well.
require ('../node_modules/semantic-ui/dist/semantic.js');

// enable all debug logs https://github.com/visionmedia/debug#browser-support
localStorage.debug = '*';

render(
  <NewDefinitionPopup />,
  document.getElementById('popup')
);
