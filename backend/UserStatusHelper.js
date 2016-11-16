/* Copyright (c) 2015 Kod Gemisi Ltd.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';

const jetpack = require('fs-jetpack');
const debug = require('debug')(__filename.split('/').pop());
const filePathHelper = require('./FilePathHelper');

const userStatusFilePath = filePathHelper.userStatusFilePath();
const defaultUserStatus = {};

let userStatus = {};

class UserStatusHelper {

  loadUserStatus() {
    debug('loadUserStatus', userStatusFilePath, jetpack.exists(userStatusFilePath));
    if (!jetpack.exists(userStatusFilePath)) {
      userStatus = jetpack.write(userStatusFilePath, defaultUserStatus);
    }

    userStatus = jetpack.read(userStatusFilePath, 'json');
    filePathHelper.setUser(userStatus.username);

    debug('loadUserStatus user loaded', userStatus);
    return userStatus;
  }

  isAuthenticated() {
    return !!userStatus.username && userStatus.username != 'anonymous';
  }

  setUserStatus(status) {
    jetpack.writeAsync(userStatusFilePath, status);
    userStatus = status;
  }
}
const userStatusHelper = new UserStatusHelper();

module.exports = userStatusHelper;
