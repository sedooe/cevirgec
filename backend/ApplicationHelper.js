/* Copyright (c) 2015 Kod Gemisi Ltd.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';

const electron = require('electron');
const Tray = electron.Tray;
const app = electron.app;
const EventEmitter = require('events');
const Menu = electron.Menu;
const jetpack = require('fs-jetpack');
const userStatusHelper = require('./UserStatusHelper');
const preferencesHelper = require('./PreferencesHelper');
const shortcutHelper = require('./ShortcutHelper');
const windowHelper = require('./WindowHelper');
const debug = require('debug')(__filename.split('/').pop());
const appDataPath = app.getPath('userData');
const wordUtils = require('./WordUtils');
const clipboardEventEmitter = require('./ClipboardEventEmitter');

const databaseFilePath = jetpack.path(appDataPath, 'database.sqlite');

let searchQueryHelper;
let trayIcon;
let authenticatedUserContextMenu;
let unauthenticatedUserContextMenu;

function initializeDaos() {
  debug("initialize daos");
  require('./dao/UserDao');
  debug("userdao alti")
  require('./dao/DictionaryDao');
  require('./dao/DefinitionDao');
  require('./dao/OnlineSourcesDao');
  require('./dao/SettingsDao');
  require('./dao/UserSearchCountDao');
  require('./dao/QuizDao');
  searchQueryHelper = require('./dao/SearchQueryHelper');
}

function initializeSystemTray() {
  trayIcon = new Tray('resources/images/trayIcon.png');
  trayIcon.setToolTip('This is cevirgec application.');

  setContextMenu(userStatusHelper.isAuthenticated());

  global.verbosityEventEmitter.on('change', (verbosity)=>{
    trayIcon.menu.items[1].checked = verbosity;
    trayIcon.setContextMenu(trayIcon.menu);
    debug('verbosityEventEmitter verbosity', verbosity);
  });
  debug('Tray icon initialized');
}

function setContextMenu(isUserAuthenticated) {
  let contextMenu;

  if(isUserAuthenticated) {
    contextMenu = [
      {
        label: 'Dashboard',
        accelerator: 'CmdOrCtrl+D',
        click: function() {
          windowHelper.openDashboardWindow(windowHelper.OPEN_MAIN_PAGE);
        }
      },
      {
        label: 'Verbose',
        type: 'checkbox',
        checked: preferencesHelper.isVerbose(),
        click: (menuItem, browserWindow) => {
          // browserWindow will be always null here
          preferencesHelper.setVerbosity(menuItem.checked);
        }
      },
      {
        label: 'Quit',
        accelerator: 'CmdOrCtrl+Q',
        selector: 'terminate:',
        click: function() {
          app.quit();
        }
      }
    ];
  }
  else {
    contextMenu = [
      {
        label: 'Register',
        click: function() {
          windowHelper.openDashboardWindow(windowHelper.OPEN_REGISTER_PAGE);
        }
      },
      {
        label: 'Login',
        click: function() {
          windowHelper.openDashboardWindow(windowHelper.OPEN_LOGIN_PAGE);
        }
      },
      {
        label: 'Quit',
        selector: 'terminate:',
        click: function() {
          app.quit();
        }
      }
    ];
  }
  
  trayIcon.setContextMenu(Menu.buildFromTemplate(contextMenu));
}

class ApplicationHelper {

  initializeApp() {
    debug("ApplicationHelper baslangic");
    if (trayIcon != null) {
      throw 'Application is already initialized!';
    }

    global.verbosityEventEmitter = new EventEmitter();
    userStatusHelper.createUserStatus();
    preferencesHelper.restoreSettings();
    shortcutHelper.restoreShortcuts();

    initializeDaos();
    initializeSystemTray();
  }

  setContextMenu(isUserAuthenticated) {
    setContextMenu(isUserAuthenticated);
  }

  getDatabaseFilePath() {
    return databaseFilePath;
  }

  clipboardChangeHandler(data) {
    let userStatus = userStatusHelper.getUserStatus();
    if (!preferencesHelper.isVerbose() || !userStatus.loggedIn) {
      debug('clipboardChangeHandler ignored', data.text);
      return;
    }

    if (windowHelper.isClipboardTriggersBlockedByAWindow()) {
      debug('clipboardChangeHandler blocked by a window', data.text);
      return;
    }

    let text = wordUtils.normalize(data.text);

    if (wordUtils.shouldTriggerContextRecognition(text)) {
      debug('context popup', text);
      windowHelper.openContextWindow(text);
      return;
    }

    if (wordUtils.shouldTriggerSearch(text)) {
      searchQueryHelper.searchWordInActiveDictionaries(text, (groupedDefinitions)=>{
        debug('clipboardChangeHandler', 'number of definitions found:', groupedDefinitions.length);
        windowHelper.openResultsWindow(text, groupedDefinitions);
      });
    }
    else {
      debug('ignored', text);
    }
  }
}

module.exports = new ApplicationHelper();
