/* Copyright (c) 2015 Kod Gemisi Ltd.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

const Sequelize = require('sequelize');
const sequelize = require('../Sequelize');
const debug = require('debug')(__filename.split('/').pop());
const { triggerChangeDefinitionPoint } = require('../dao/StudyQuizResultsDao');

const UserSearchCount = sequelize.define('userSearchCount', {
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
  hooks: {
    afterUpdate: (searchCount) => {
      if (searchCount.changed('count')) {
        debug('definition', searchCount.definition);
        debug('dictionaryId', searchCount.dictionaryId);
        triggerChangeDefinitionPoint(searchCount.definition, searchCount.dictionaryId);
      }
    }
  },
  freezeTableName: true
});

module.exports = UserSearchCount;
