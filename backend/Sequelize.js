/* Copyright (c) 2015 Kod Gemisi Ltd.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';

const Sequelize = require('sequelize');
const applicationHelper = require('./ApplicationHelper');
const debug = require('debug')(__filename.split('/').pop());

const sequelize = new Sequelize('', '', null, {
  dialect: 'sqlite',
  storage: applicationHelper.getDatabaseFilePath()
});

debug('Using db path: ' + applicationHelper.getDatabaseFilePath());

module.exports = sequelize;
