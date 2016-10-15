/* Copyright (c) 2015 Kod Gemisi Ltd.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';

var Sequelize = require('sequelize');
var sequelize = require('../Sequelize');

var UserSearchCount = sequelize.define('userSearchCount', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  definition: {
    type: Sequelize.STRING
  },
  count: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  }
},
{
  freezeTableName: true
});

module.exports = UserSearchCount;
