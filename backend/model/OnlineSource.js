/* Copyright (c) 2015 Kod Gemisi Ltd. 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';

var Sequelize = require('sequelize');
var sequelize = require('../Sequelize');

var OnlineSource = sequelize.define('onlineSource', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING
  },
  url: {
    type: Sequelize.STRING
  },
  sourceLanguage: {
    type: Sequelize.STRING
  },
  index: {
    type: Sequelize.INTEGER
  }
},
{
  freezeTableName: true
});

OnlineSource.sync();

module.exports = OnlineSource;