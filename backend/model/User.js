/* Copyright (c) 2015 Kod Gemisi Ltd.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';

var Sequelize = require('sequelize');
var sequelize = require('../Sequelize');

const Dictionary = require('./Dictionary');
const SoldListing = require('./SoldListing');

var User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING
  },
  surname: {
    type: Sequelize.STRING
  },
  username: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  tckn: {
    type: Sequelize.BIGINT
  },
  phone: {
    type: Sequelize.STRING
  },
  avatar: {
    type: Sequelize.STRING
  },
  birthDate: {
    type: Sequelize.DATEONLY
  },
  description: {
    type: Sequelize.STRING
  },
  token: {
    type: Sequelize.STRING
  }
},
{
  freezeTableName: true
});

User.hasMany(Dictionary);
User.hasMany(SoldListing);

User.sync();
Dictionary.sync();
SoldListing.sync();

module.exports = User;
