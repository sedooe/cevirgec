/* Copyright (c) 2015 Kod Gemisi Ltd.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';

const jetpack = require('fs-jetpack');
const electron = require('electron');
const debug = require('debug')(__filename.split('/').pop());
const app = electron.app;
const appDataPath = app.getPath('userData');

const userStatusFilePath = jetpack.path(appDataPath, 'user-status.json');
const defaultUserStatus = {loggedIn: false};
let userStatus;

class UserStatusHelper {

  createUserStatus() {
    if (!jetpack.exists(userStatusFilePath)) {
      userStatus = jetpack.write(userStatusFilePath, defaultUserStatus);
    }

    userStatus = jetpack.read(userStatusFilePath, 'json');
  }

  getUserStatus() {
    return userStatus;
  }

  setUserStatus(status) {
    jetpack.writeAsync(userStatusFilePath, status);
    userStatus = status;
  }
}

module.exports = new UserStatusHelper();
