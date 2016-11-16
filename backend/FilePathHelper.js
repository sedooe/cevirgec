/* Copyright (c) 2015 Kod Gemisi Ltd.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';

const ANONYMOUS = 'anonymous';
const { app, ipcMain } = require('electron');
const jetpack = require('fs-jetpack');
const debug = require('debug')(__filename.split('/').pop());

import * as Actions from '../app/actions/constants';

/**
 * app.getPath: https://github.com/electron/electron/blob/master/docs/api/app.md#appgetpathname
 * jetpack.path: https://github.com/szwacz/fs-jetpack#pathparts
**/
const appDataPath = jetpack.path(app.getPath('appData'), 'cevirgec');
const userStatusFilePath = jetpack.path(appDataPath, 'user.json');
let activeUser = ANONYMOUS;

class FilePathHelper {
  constructor() {
    jetpack.dir(appDataPath);
  }

  setUser(username) {
    activeUser = username || ANONYMOUS;

    const userDirectory = jetpack.path(appDataPath, activeUser);
    jetpack.dir(userDirectory); //ensure user's directory exists
  }

  databaseFilePath() {
    return jetpack.path(appDataPath, activeUser, 'database.sqlite');
  }

  settingsFilePath() {
    return jetpack.path(appDataPath, activeUser, 'settings.json');
  }

  /**
   * This file holds active user's username
   * format is json:
   * {"username": "<example_username>"}
  **/
  userStatusFilePath() {
    return userStatusFilePath;
  }
}

const filePathHelper = new FilePathHelper();
module.exports = filePathHelper;

ipcMain.on(Actions.LOGIN_SUCCESS, function(event, user) {
  debug(Actions.LOGIN_SUCCESS, user);
  filePathHelper.setUser(user.username);
});

ipcMain.on(Actions.LOGOUT_SUCCESS, function(event) {
  debug(Actions.LOGOUT_SUCCESS);
  filePathHelper.setUser(ANONYMOUS);
});
