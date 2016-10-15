/* Copyright (c) 2015 Kod Gemisi Ltd.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';

const UserSearchCount = require('../../model/UserSearchCount');
const debug = require('debug')(__filename.split('/').pop());

function getUserSearchCountsByDictionaryId(dictionaryId) {
  return new Promise(function(resolve, reject) {
    UserSearchCount.findAll({where: {dictionaryId: dictionaryId}})
      .then(function (resultArray) {
        let userSearchCounts = resultArray.map(function (entity) {
          return entity.toJSON();
        });
        resolve(userSearchCounts);
      });
  });
}

function getDefinitionsFromUserSearchCountsByDictionaryId(dictionaryId) {
  return new Promise(function(resolve, reject) {
    UserSearchCount.findAll(
      {where: {dictionaryId: dictionaryId},
       limit: 10,
       order: [['count', 'DESC']]
      }).then(function (resultArray) {
        let definitions = new Set();
        resultArray.forEach(function (entity) {
          definitions.add(entity.definition);
        });
        resolve(Array.from(definitions)); //Set to Array
      });
  });
}

function upsert(userSearchCount) {
  return new Promise(function (resolve, reject) {
    UserSearchCount.findOne({where: {id: userSearchCount.id}})
    .then(function (userSearchCountLocal) {
      if (userSearchCountLocal == null) {
        UserSearchCount.create(userSearchCount);
      } else {
        UserSearchCount.update(userSearchCount, {where: {id: userSearchCount.id}});
      }
      resolve();
    });
  });
}

module.exports = {
  getUserSearchCountsByDictionaryId,
  getDefinitionsFromUserSearchCountsByDictionaryId,
  upsert
};
