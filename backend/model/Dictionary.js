/* Copyright (c) 2015 Kod Gemisi Ltd.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';

const Sequelize = require('sequelize');
const sequelize = require('../Sequelize');
const Definition = require('./Definition');
const UserSearchCount = require('./UserSearchCount');
const ipc = require("electron").ipcMain;
const debug = require('debug')(__filename.split('/').pop());

const numberOfDefinitionsCache = {};

let Dictionary = sequelize.define('dictionary', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.STRING
  },
  sourceLanguage: {
    type: Sequelize.STRING
  },
  targetLanguage: {
    type: Sequelize.STRING
  },
  context: {
    type: Sequelize.STRING
  },
  active: {
    type: Sequelize.BOOLEAN
  },
  numberOfDefinitions: {
    type: Sequelize.VIRTUAL,
    get: function () {
      return numberOfDefinitionsCache[this.get('id')] || 0;
    },
    set: function (num) {
      numberOfDefinitionsCache[this.get('id')] = num;
      debug('New numberOfDefinitions for', this.get('id'), 'is', num)
    }
  },
  deleted: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
},
{
  freezeTableName: true
});

Dictionary.hasMany(Definition);
Definition.belongsTo(Dictionary);
Dictionary.hasMany(UserSearchCount);

// Need to place here to avoid cyclic dependency between Dictionary and Definition
// Keep  `numberOfDefinitions` calculated field up-to-date
Definition.afterCreate(function(definition, options) {
  debug('afterCreate')

  Definition.count({'dictionaryId': definition.dictionaryId}).then(function(count){
    Dictionary.findById(definition.dictionaryId).then(function (dictionary) {
      dictionary.set('numberOfDefinitions', count);
    });
  });
});

// use here in order associations to take effect
Definition.sync();
UserSearchCount.sync();

// Calculate initial `numberOfDefinitions`
Dictionary.findAll().then(function (dictionaries) {
  dictionaries.forEach(function (dictionary) {

    // FIXME use count query
    dictionary.getDefinitions().then(function (definitions) {
      dictionary.set('numberOfDefinitions', definitions.length);
    })
  });
})

module.exports = Dictionary;
