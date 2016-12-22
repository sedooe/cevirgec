/* Copyright (c) 2015 Kod Gemisi Ltd.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

const Sequelize = require('sequelize');
const sequelize = require('../Sequelize');

const StudyQuizResults = sequelize.define('studyQuizResults', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  point: {
    type: Sequelize.INTEGER
  }
},
{
  freezeTableName: true
});

module.exports = StudyQuizResults;
