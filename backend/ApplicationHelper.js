/* Copyright (c) 2015 Kod Gemisi Ltd.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';

const electron = require('electron');

const {app, ipcMain, Tray, Menu} = require('electron');
const EventEmitter = require('events');
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

import * as Actions from '../app/actions/constants';

let searchQueryHelper;
let trayIcon;
let authenticatedUserContextMenu;
let unauthenticatedUserContextMenu;

function initializeDaos() {
  debug('initializeDaos');
  require('./dao/UserDao');
  require('./dao/DictionaryDao');
  require('./dao/DefinitionDao');
  require('./dao/OnlineSourcesDao');
  require('./dao/SettingsDao');
  require('./dao/UserSearchCountDao');
  require('./dao/QuizDao');
  searchQueryHelper = require('./dao/SearchQueryHelper');
  debug('End of initializeDaos');
}

function initializeSystemTray() {
  trayIcon = new Tray('resources/images/trayIcon.png');
  trayIcon.setToolTip('This is cevirgec application.');

  applicationHelper.setTrayContextMenu(userStatusHelper.isAuthenticated());

  global.verbosityEventEmitter.on('change', (verbosity)=>{
    trayIcon.menu.items[1].checked = verbosity;
    trayIcon.setContextMenu(trayIcon.menu);
    debug('verbosityEventEmitter verbosity', verbosity);
  });
  debug('Tray icon initialized');
}

class ApplicationHelper {

  initializeApp() {
    if (trayIcon != null) {
      throw 'Application is already initialized!';
    }
    global.verbosityEventEmitter = new EventEmitter();
    userStatusHelper.loadUserStatus();
    preferencesHelper.restoreSettings();
    shortcutHelper.restoreShortcuts();

    initializeDaos();
    initializeSystemTray();
  }

  setTrayContextMenu(isUserAuthenticated) {
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

  getDatabaseFilePath() {
    return databaseFilePath;
  }

  clipboardChangeHandler(data) {
    if (!preferencesHelper.isVerbose() || !userStatusHelper.isAuthenticated()) {
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
        windowHelper.openResultPopup(text, groupedDefinitions);
      });
    }
    else {
      debug('ignored', text ? '' : '<no text in clipboard> this is probably second call for clipboard workaround');
    }
  }
}

const applicationHelper = new ApplicationHelper();
module.exports = applicationHelper;


ipcMain.on(Actions.LOGIN_SUCCESS, function(event, user) {
  debug(Actions.LOGIN_SUCCESS, user);

  userStatusHelper.setUserStatus({loggedIn: true});
  shortcutHelper.registerGlobalShortcuts();
  console.log(ApplicationHelper, applicationHelper.setTrayContextMenu, JSON.stringify(ApplicationHelper));
  applicationHelper.setTrayContextMenu(true);
  // sync.start();
});

ipcMain.on(Actions.LOGOUT_SUCCESS, function(event) {
  debug(Actions.LOGOUT_SUCCESS);

  userStatusHelper.setUserStatus({loggedIn: false});
  shortcutHelper.unregisterAll();
  console.log(ApplicationHelper, applicationHelper.setTrayContextMenu, JSON.stringify(ApplicationHelper));
  applicationHelper.setTrayContextMenu(false);
  // sync.stop();
});
