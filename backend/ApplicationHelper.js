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
const wordUtils = require('./WordUtils');
const clipboardEventEmitter = require('./ClipboardEventEmitter');
const filePathHelper = require('./FilePathHelper');

import * as Actions from '../app/actions/constants/user';

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
  require('./dao/UserSearchCountDao');
  require('./dao/QuizDao');
  require('./dao/StudyQuizResultsDao');
  searchQueryHelper = require('./dao/SearchQueryHelper');
  debug('End of initializeDaos');
}

function initializeSystemTray() {
  trayIcon = new Tray('resources/images/trayIcon.png');
  trayIcon.setToolTip('This is cevirgec application.');

  global.verbosityEventEmitter.on('change', (verbosity)=>{
    trayIcon.menu.items[1].checked = verbosity;
    trayIcon.setContextMenu(trayIcon.menu);
    debug('verbosityEventEmitter verbosity', verbosity);
  });
  debug('Tray icon initialized');
}

class ApplicationHelper {

  /**
   * This method is used in Sequelize.js
   * When I try to use FilePathHelper.databaseFilePath() directly in Sequelize.js
   * instead of this method the application hangs. It's smth like cyclic deps.
  **/
  getDatabaseFilePath() {
    return filePathHelper.databaseFilePath();
  }

  initializeApp() {
    if (trayIcon != null) {
      throw 'Application is already initialized!';
    }
    global.verbosityEventEmitter = new EventEmitter();
    initializeSystemTray();

    const user = userStatusHelper.loadUserStatus();
    this.loginSuccess(user);

    initializeDaos();
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

  clipboardChangeHandler(data) {
    const { upsertSearchCount } = require('./dao/UserSearchCountDao');

    if (!preferencesHelper.isVerbose() || !userStatusHelper.isAuthenticated()) {
      debug('clipboardChangeHandler ignored', data.text);
      return;
    }

    if (windowHelper.isClipboardTriggersBlockedByAWindow()) {
      debug('clipboardChangeHandler blocked by a window', data.text);
      return;
    }

    const text = wordUtils.normalize(data.text);

    if (wordUtils.shouldTriggerContextRecognition(text)) {
      debug('context popup', text);
      windowHelper.openContextWindow(text);
      return;
    }

    if (wordUtils.shouldTriggerSearch(text)) {
      searchQueryHelper.searchWordInActiveDictionaries(text, (groupedDefinitions)=>{
        debug('clipboardChangeHandler', 'number of definitions found:', groupedDefinitions.length);
        const dictionaryIds = [];
        if (groupedDefinitions.length > 0) {
          groupedDefinitions.forEach(result => {
            dictionaryIds.push(result.dataValues.id);
          });
          upsertSearchCount(text, dictionaryIds);
        }
        windowHelper.openResultPopup(text, groupedDefinitions);
      });
    }
    else {
      debug('ignored', text ? '' : '<no text in clipboard> this is probably second call for clipboard workaround');
    }
  }

  // this is also called just after userStatusHelper.loadUserStatus()
  loginSuccess(user) {
    reloadDbModules();
    userStatusHelper.setUserStatus({username: user.username});

    preferencesHelper.restoreSettings();
    shortcutHelper.restoreShortcuts();

    shortcutHelper.registerGlobalShortcuts();
    this.setTrayContextMenu(userStatusHelper.isAuthenticated());//FIXME this is necessary bu inconsistent
    // sync.start();
  }
}

const applicationHelper = new ApplicationHelper();
module.exports = applicationHelper;


ipcMain.on(Actions.LOGIN_SUCCESS, function(event, user) {
  debug(Actions.LOGIN_SUCCESS, user);

  applicationHelper.loginSuccess(user);
});

ipcMain.on(Actions.LOGOUT_SUCCESS, function(event) {
  debug(Actions.LOGOUT_SUCCESS);

  userStatusHelper.setUserStatus({});
  shortcutHelper.unregisterAll();
  applicationHelper.setTrayContextMenu(false);
  // sync.stop();
});


function reloadDbModules() {
  const decache = require('decache');

  debug('decache modules')

  decache('./Sequelize')
  decache('./model/Definition')
  decache('./model/Dictionary')
  decache('./model/OnlineSource')
  decache('./model/SoldListing')
  decache('./model/User')
  decache('./model/UserSearchCount')
  decache('./model/StudyQuizResults')

  decache('./dao/UserDao');
  decache('./dao/DictionaryDao');
  decache('./dao/DefinitionDao');
  decache('./dao/OnlineSourcesDao');
  decache('./dao/UserSearchCountDao');
  decache('./dao/QuizDao');
  decache('./dao/SearchQueryHelper');

  var Sequelize = require('sequelize');
  var sequelize = require('./Sequelize');

  initializeDaos();
  debug('decache modules done')
}
