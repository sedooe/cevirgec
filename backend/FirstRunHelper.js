/* Copyright (c) 2015 Kod Gemisi Ltd.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';

const electron = require('electron');
const app = electron.app;
const jetpack = require('fs-jetpack');
const debug = require('debug')(__filename.split('/').pop());
const appDataPath = app.getPath('userData');
const defaultOnlineSourcesFilePath = jetpack.path('resources', 'defaultOnlineSources.json');

let defaultOnlineSources;

class FirstRunHelper {

  restoreDefaultOnlineSources() {
    defaultOnlineSources = jetpack.read(defaultOnlineSourcesFilePath, 'json');
  }

  persistDefaultOnlineSources() {
    const OnlineSources = require('./model/OnlineSource'); //FIXME

    this.restoreDefaultOnlineSources();

    defaultOnlineSources.forEach((onlineSource)=>{
      OnlineSources.create(onlineSource);
    });
  }

  doFirstRunWork() {
    this.persistDefaultOnlineSources();
  }
}

module.exports = new FirstRunHelper();
