/* Copyright (c) 2015 Kod Gemisi Ltd.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';

const Definition = require('../../model/Definition');
const debug = require('debug')(__filename.split('/').pop());

function getAllDefinitions() {
  return new Promise(function(resolve, reject) {
    let values;
    Definition.findAll().then(function (resultArray) {
      values = resultArray.map(function (entity) {
        return entity.toJSON();
      });
    });
    debug(values);
    resolve(values);
  });
}

function getAllDefinitionsByDictionaryId(dictionaryId) {
  return new Promise(function(resolve, reject) {
    let values;
    Definition.findAll({where: {dictionaryId: dictionaryId}}).then(function (resultArray) {
      values = resultArray.map(function (entity) {
        return entity.toJSON();
      });
      resolve(values);
    });
  });
}

function create(definition) {
  // returns Promise
  return Definition.create(definition);
}

function upsert(definition) {
  return new Promise(function (resolve, reject) {
    Definition.findOne({where: {id: definition.id}})
    .then(function (definitionLocal) {
      if (definitionLocal == null) {
        Definition.create(definition);
      } else {
        Definition.update(definition, {where: {id: definition.id}});
      }
      resolve();
    });
  });
}

module.exports = {
  getAllDefinitions,
  getAllDefinitionsByDictionaryId,
  create,
  upsert
};
