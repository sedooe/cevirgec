/* Copyright (c) 2015 Kod Gemisi Ltd.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';

const electron = require('electron');
const app = electron.app;
const jetpack = require('fs-jetpack');
const debug = require('debug')(__filename.split('/').pop());
const firstRunHelper = require('./FirstRunHelper');
const appDataPath = app.getPath('userData');

const settingsFilePath = jetpack.path(appDataPath, 'settings.json');
const defaultSettings = {
  verbose: false, // FIXME
  shortcuts: {
    openDashboard: 'Ctrl+Alt+X',
    wordAdd: 'Ctrl+Alt+A',
    lookUp: 'Ctrl+Alt+S',
    toggleVerbosity: 'Ctrl+Alt+G'
  }
}

let settings;

class PreferencesHelper {

  restoreSettings() {
    // Create defaultSettings at first run
    if(!jetpack.exists(settingsFilePath)) {
      firstRunHelper.doFirstRunWork();
      jetpack.write(settingsFilePath, defaultSettings);
    }

    settings = jetpack.read(settingsFilePath, 'json');
  }

  saveSettings() {
    jetpack.writeAsync(settingsFilePath, settings);
  }

  updateSettings(newSettings) {
    settings = newSettings;
    this.saveSettings();
    global.verbosityEventEmitter.emit('change', newSettings.verbose);
  }

  getSettings() {
    return settings;
  }

  setVerbosity(verbose) {
    settings.verbose = verbose;
    this.saveSettings();
  }

  isVerbose() {
    return settings.verbose;
  }

  getDefaultShortcuts() {
    return defaultSettings.shortcuts;
  }
}

module.exports = new PreferencesHelper();
