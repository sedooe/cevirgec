/* Copyright (c) 2015 Kod Gemisi Ltd.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';

const Dictionary = require('../../model/Dictionary');
const debug = require('debug')(__filename.split('/').pop());

function getDictionariesByUserId(userId, deleted, context) {
  return new Promise(function(resolve, reject) {
    let queryObject = {'userId': userId};
    if (!deleted) {
      queryObject.deleted = false; //if 'deleted' param is false, bring deleted ones also.
    }
    Dictionary.findAll({where: queryObject})
      .then(function (resultArray) {
        let dictionaries = resultArray.map(function (entity) {
          return entity.toJSON();
        });
        resolve(dictionaries);
      });
  });
}

function getDictionariesByUserIdAndContext(userId, context) {
  return new Promise(function(resolve, reject) {
    Dictionary.findAll({where: {userId: userId, context: context, deleted: false}})
      .then(function (resultArray) {
        let dictionaries = resultArray.map(function (entity) {
          return entity.toJSON();
        });
        resolve(dictionaries);
      });
  });
}

function create(dictionary) {
  // returns Promise
  return Dictionary.create(dictionary);
}

function upsert(dictionary) {
  return new Promise(function (resolve, reject) {
    Dictionary.findOne({where: {id: dictionary.id}})
    .then(function (dictionaryLocal) {
      if (dictionaryLocal == null) {
        Dictionary.create(dictionary);
      } else {
        Dictionary.update(dictionary, {where: {id: dictionary.id}});
      }
      resolve();
    });
  });
}

module.exports = {
  getDictionariesByUserId,
  getDictionariesByUserIdAndContext,
  create,
  upsert
};
