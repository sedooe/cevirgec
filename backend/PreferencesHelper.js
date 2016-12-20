/* Copyright (c) 2015 Kod Gemisi Ltd.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

const jetpack = require('fs-jetpack');
const firstRunHelper = require('./FirstRunHelper');
const filePathHelper = require('./FilePathHelper');
const debug = require('debug')(__filename.split('/').pop());

let settingsFilePath;

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
    settingsFilePath = filePathHelper.settingsFilePath();

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

  toggleVerbosity() {
    settings.verbose = !settings.verbose;
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
