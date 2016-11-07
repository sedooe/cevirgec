/* Copyright (c) 2015 Kod Gemisi Ltd.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';

const electron = require('electron');
const ipc = electron.ipcMain;
const BrowserWindow = electron.BrowserWindow;
const windowStateKeeper = require('electron-window-state');
const menuHelper = require('./MenuHelper');
const wordUtils = require('./WordUtils');
//const UiEvents = require('../app/events/UiEvents');
const debug = require('debug')(__filename.split('/').pop());

const OPEN_MAIN_PAGE = 'OPEN_MAIN_PAGE';
const OPEN_REGISTER_PAGE = 'OPEN_REGISTER_PAGE';
const OPEN_LOGIN_PAGE = 'OPEN_LOGIN_PAGE';

let mainWindow = null;
let mainWindowState;

let newDefinitionWindow = null;
let resultsWindow = null;
let contextWindow = null;

// When a word is couldn't found in verbose mode, the button to open
// AddDefinitionWindow triggers this callback
// ipc.on(UiEvents.OPEN_NEW_DEFINITION_WINDOW_FOR_WORD, function(event, data) {
//   debug(UiEvents.OPEN_NEW_DEFINITION_WINDOW_FOR_WORD, data);
//
//   let theWord = wordUtils.normalize(data);
//   openNewDefinitionWindowForWord(theWord);
// });
//
// ipc.on(UiEvents.OPEN_NEW_DEFINITION_WINDOW_FOR_DICTIONARY, function(event, data) {
//   debug(UiEvents.OPEN_NEW_DEFINITION_WINDOW_FOR_DICTIONARY, data);
//
//   openNewDefinitionWindowForDictionary(data);
// });

function openDashboardWindow() {

  if(mainWindow != null){
    mainWindow.show();
    mainWindow.restore();
    return;
  }

  // Preserver of the window size and position between app launches.
  mainWindowState = windowStateKeeper({
    defaultWidth: 1000,
    defaultHeight: 600
  });

  let windowOptions = {
    width: mainWindowState.width,
    height: mainWindowState.height,
    minHeight: 500,
    minWidth: 700,
    show: false
  };

  // Center the window if this is the first run
  if(mainWindowState.x == undefined){
    windowOptions.center = true;
  }
  else{
    windowOptions.x = mainWindowState.x;
    windowOptions.y = mainWindowState.y;
  }

  mainWindow = new BrowserWindow(windowOptions);
  mainWindowState.manage(mainWindow);
  menuHelper.createApplicationMenu(mainWindow);

  mainWindow.loadURL(`file://${__dirname}/../app/app.html`);

  mainWindow.webContents.on('did-finish-load', function() {
    mainWindow.show();
    mainWindow.restore();
  });

  mainWindow.on('close', function () {
    mainWindow = null;
  });
}

function openNewDefinitionWindowForWord(selectedText) {
  // if this window is opened by a shortcut, selectedText is undefined
  selectedText = selectedText ? selectedText : '';
  let queryString = `currentWord=${selectedText}`;
  _openNewDefinitionCommonWindow(queryString);
}

function openNewDefinitionWindowForDictionary(dictionaryIds) {
  let queryString = `currentWord=%20&dictionaryIds=${dictionaryIds}`;
  _openNewDefinitionCommonWindow(queryString);
}

function _openNewDefinitionCommonWindow(queryString) {

    if(newDefinitionWindow != null){

      // TODO verbose functionality must be suspended when this window is open

      newDefinitionWindow.show();
      newDefinitionWindow.restore();
      return;
    }

    const electronScreen = electron.screen;
    // const position = electronScreen.getCursorScreenPoint();
    const size = electronScreen.getPrimaryDisplay().workAreaSize;

    let windowOptions = {
      // x: position.x,
      // y: position.y,
      width: size.width,
      height: size.height,
      minHeight: 500,
      minWidth: 1300,
      show: false
    };

    newDefinitionWindow = new BrowserWindow(windowOptions);

    if (process.env.HOT) {
      newDefinitionWindow.loadURL(`file://${__dirname}/../app/hot-dev-new-definition.html?${queryString}`);
    } else {
      newDefinitionWindow.loadURL(`file://${__dirname}/../app/new-definition.html?${queryString}`);
    }

    if (process.env.NODE_ENV === 'development') {
      newDefinitionWindow.openDevTools();
    }

    newDefinitionWindow.webContents.on('dom-ready', function() {
      newDefinitionWindow.maximize();
      newDefinitionWindow.show();
    });

    newDefinitionWindow.on('close', function () {
      newDefinitionWindow = null;
    });
}

function openResultsWindow(selectedText, definitionsObj) {

  if (resultsWindow != null){
    resultsWindow.close();
    resultsWindow = null;
  }

  const electronScreen = electron.screen;
  const position = electronScreen.getCursorScreenPoint();

  let windowOptions = {
    x: position.x,
    y: position.y,
    width: 600,
    height: 600,
    minHeight: 320,
    minWidth: 320,
    alwaysOnTop: true,
    frame: false,
    skipTaskbar: true,
    // transparent: true,
    show: false
  };

  resultsWindow = new BrowserWindow(windowOptions);

  let urlQueryPart = `?selectedText=${selectedText}&results=${JSON.stringify(definitionsObj)}`;

  if (process.env.HOT) {
    resultsWindow.loadURL(`file://${__dirname}/../app/hot-dev-results.html${urlQueryPart}`);
  } else {
    resultsWindow.loadURL(`file://${__dirname}/../app/results.html${urlQueryPart}`);
  }

  if (process.env.NODE_ENV === 'development') {
    resultsWindow.openDevTools();
  }

  resultsWindow.webContents.on('dom-ready', function() {
    resultsWindow.show();
  });

  resultsWindow.on('close', function () {
    resultsWindow = null;
  });
}

function openContextWindow(selectedText) {

  if (contextWindow != null){
    contextWindow.close();
    contextWindow = null;
  }

  const electronScreen = electron.screen;
  const position = electronScreen.getCursorScreenPoint();

  let windowOptions = {
    x: position.x,
    y: position.y,
    width: 600,
    height: 600,
    minHeight: 600,
    minWidth: 600,
    alwaysOnTop: true,
    frame: false,
    skipTaskbar: true,
    // transparent: true,
    show: false
  };

  contextWindow = new BrowserWindow(windowOptions);

  // cannot decode '%' character in frontend, not time for a proper fix :(
  selectedText = selectedText.replace(/%/g, '');

  let urlQueryPart = `?selectedText=${selectedText}`;

  if (process.env.HOT) {
    contextWindow.loadURL(`file://${__dirname}/../app/hot-dev-context-results.html${urlQueryPart}`);
  } else {
    contextWindow.loadURL(`file://${__dirname}/../app/context-results.html${urlQueryPart}`);
  }

  if (process.env.NODE_ENV === 'development') {
    contextWindow.openDevTools();
  }

  contextWindow.webContents.on('dom-ready', function() {
    contextWindow.show();
  });

  contextWindow.on('close', function () {
    contextWindow = null;
  });
}

function isClipboardTriggersBlockedByAWindow() {
  return newDefinitionWindow != null;
}

module.exports = {
  openDashboardWindow,
  openNewDefinitionWindowForWord,
  openNewDefinitionWindowForDictionary,
  openResultsWindow,
  openContextWindow,
  isClipboardTriggersBlockedByAWindow
}
