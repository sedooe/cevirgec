/* Copyright (c) 2015 Kod Gemisi Ltd.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

const Sequelize = require('sequelize');
const sequelize = require('../Sequelize');

const Type = [
  'NONE',
  'NOUN',
  'VERB',
  'VERB_TRANSITIVE',
  'VERB_INTRANSITIVE',
  'ADJECTIVE',
  'ADVERB',
  'PRONOUN',
  'PREPOSITION',
  'CONJUNCTION',
  'INTERJECTION',
  'PHRASAL_VERBS',
  'IDIOM',
  'PHRASE'
];

const Sex = [
  'NEUTER',
  'MASCULINE',
  'FEMININE'
];

const Definition = sequelize.define('definition', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  key: {
    type: Sequelize.STRING
  },
  value: {
    type: Sequelize.STRING
  },
  usage: {
    type: Sequelize.TEXT
  },
  notes: {
    type: Sequelize.TEXT
  },
  type: {
    type: Sequelize.ENUM,
    values: Type
  },
  sex: {
    type: Sequelize.ENUM,
    values: Sex
  }
},
{
  freezeTableName: true
});

Definition.beforeCreate(function(definition, options) {
  // FIXME use a key-maker function
  definition.key = definition.key.toLowerCase().trim();
});

module.exports = Definition;
