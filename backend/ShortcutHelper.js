/* Copyright (c) 2015 Kod Gemisi Ltd.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';

const jetpack = require('fs-jetpack');
const electron = require('electron');
const ipc = electron.ipcMain;
const globalShortcut = electron.globalShortcut;
const clipboard = electron.clipboard;
const windowHelper = require('./WindowHelper');
const debug = require('debug')(__filename.split('/').pop());
const PreferencesHelper = require('./PreferencesHelper');
const wordUtils = require('./WordUtils');
const app = electron.app;
const appDataPath = app.getPath('userData');

const shortcutCallbacks = {
  openDashboard: function dashboardOpenShortcutCallback () {
    debug('openDashboard shortcut activated');
    windowHelper.openDashboardWindow(windowHelper.OPEN_MAIN_PAGE);
  },
  wordAdd: function wordAddShortcutCallback () {
    debug('wordAdd shortcut activated');

    // if triggered via a shortcut instead of clipboard change
    // show last clipboard content
    let text = clipboard.readText('selection');
    text = wordUtils.normalize(text);
    windowHelper.openNewDefinitionWindowForWord(text);
  },
  lookUp: function lookUpShortcutCallback () {
    debug('lookUp shortcut activated');
  },
  toggleVerbosity: function toggleVerbosityShortcutCallback () {
    debug('toggleVerbosity shortcut activated');
  }
}
Object.freeze(shortcutCallbacks);

class ShortcutHelper {

  __getSettings() {
    return PreferencesHelper.getSettings();
  }

  registerGlobalShortcuts() {
    Object.keys(this.shortcuts).forEach(function (key, index, array) {
      this.registerGlobalShortcut(this.shortcuts[key], shortcutCallbacks[key]);
    }, this);
  }

  registerGlobalShortcut(shortcut, callback) {
    debug('registerGlobalShortcut', shortcut, callback)
    const ret = globalShortcut.register(shortcut, callback);

    if (ret) {
      // Check whether a shortcut is registered.
      debug(shortcut, ' is registered: ', globalShortcut.isRegistered(shortcut));
      return true;
    }

    debug(shortcut, 'registration failed');
    return false;
  }

  restoreShortcuts() {
    let settings = this.__getSettings();
    this.shortcuts = settings.shortcuts;
    debug('restoreShortcuts', this.shortcuts);
  }

  // saveShortcuts() {
  //
  //   settings.shortcuts = this.shortcuts;
  //   PreferencesHelper.updateSettings(settings);
  // }
  //
  // // shortcutType one of the keys of defaultShortcuts
  // setShortcut(shortcutType, shortcutString) {
  //   if(typeof defaultShortcuts[shortcutType] === undefined) {
  //     throw new Error(shortcutType + ' is not a valid shortcut key!');
  //   }
  //
  //   if(this.registerGlobalShortcut(this.shortcut[shortcutType], shortcutCallbacks[shortcutType])) {
  //     globalShortcut.unregister(this.shortcut[shortcutType]);
  //     this.shortcut[shortcutType] = shortcutString;
  //     this.saveShortcuts();
  //   }
  // }

  unregisterAll() {
    return globalShortcut.unregisterAll();
  }
}

module.exports = new ShortcutHelper();
