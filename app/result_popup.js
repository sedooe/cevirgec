'use strict';

import React from 'react';
import { render } from 'react-dom';
import ResultsWindow from './containers/ResultsWindow';

// See https://github.com/atom/electron/issues/254
window.jQuery = window.$ = require('jquery');

// importing this doesn't work because it's executed before
// 'require's and since this is dependant to jQuery application
// breaks. Hence we had to require semantic-ui as well.
require ('../node_modules/semantic-ui/dist/semantic.js');

// enable all debug logs https://github.com/visionmedia/debug#browser-support
localStorage.debug = '*';

var queryString = function parseUrlParams() {
  let
    match,
    pl     = /\+/g,  // Regex for replacing addition symbol with a space
    search = /([^&=]+)=?([^&]*)/g,
    decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
    query  = window.location.search.substring(1);

  let urlParams = {};
  while (match = search.exec(query)) {
    urlParams[decode(match[1])] = decode(match[2]);
  }

  return urlParams;
}();

render(
  <ResultsWindow
    selectedText={queryString.selectedText}
    results={JSON.parse(queryString.results)}
  />,
  document.getElementById('results')
);

$(()=>{
  $('body').on('click', ()=>{
    $('#main').text('clicked')
  });
});
