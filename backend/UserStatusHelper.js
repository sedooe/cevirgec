/* Copyright (c) 2015 Kod Gemisi Ltd.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';

const {app} = require('electron');
const jetpack = require('fs-jetpack');
const ShortcutHelper = require('./ShortcutHelper');
const ApplicationHelper = require('./ApplicationHelper');
const debug = require('debug')(__filename.split('/').pop());

const appDataPath = app.getPath('userData');
const userStatusFilePath = jetpack.path(appDataPath, 'user-status.json');
const defaultUserStatus = {loggedIn: false};

let userStatus = {};

class UserStatusHelper {

  loadUserStatus() {
    if (!jetpack.exists(userStatusFilePath)) {
      userStatus = jetpack.write(userStatusFilePath, defaultUserStatus);
    }

    userStatus = jetpack.read(userStatusFilePath, 'json');
  }

  isAuthenticated() {
    return userStatus.loggedIn == true;
  }

  setUserStatus(status) {
    jetpack.writeAsync(userStatusFilePath, status);
    userStatus = status;
  }
}
const userStatusHelper = new UserStatusHelper();

module.exports = userStatusHelper;
