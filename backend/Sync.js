/* Copyright (c) 2015 Kod Gemisi Ltd.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';

const electron = require('electron');
const BrowserWindow = electron.BrowserWindow;
const windowStateKeeper = require('electron-window-state');
const DictionaryQueries = require('./dao/queries/DictionaryQueries');
const DefinitionQueries = require('./dao/queries/DefinitionQueries');
const UserSearchCountQueries = require('./dao/queries/UserSearchCountQueries');
const ApiUrls = {};
const request = require('request');
const debug = require('debug')(__filename.split('/').pop());

const minute = 60000;

let intervalHandler;

class Sync {

  start(userStatus) {
    let that = this;
    intervalHandler = setInterval(function() {
      that.syncSources(userStatus);
    }, 5*minute);
  }

  syncSources(userStatus) {
    let that = this;

    return new Promise(function(resolve, reject) {
      that.__requestDictionaries(userStatus).then(function(dictionaryIds) {
        that.__requestDefinitions(dictionaryIds, userStatus.token).then(function() {
          that.__requestUserSearchCounts(dictionaryIds, userStatus.token).then(function() {
            resolve();
          });
        });
      });
    });
  }

  __requestDictionaries(userStatus) {
    let that = this;
    let dictionaryIds = [];

    return new Promise(function(resolve, reject) {
      DictionaryQueries.getDictionariesByUserId(userStatus.id, true).then(function (dictionaries) {
        let url = ApiUrls.POST_DICTIONARY(userStatus.username);

        dictionaries.forEach((dictionary)=>{
          that.__convertDateFormat(dictionary);
          if (!dictionary.deleted) { //for userSearchCounts
            dictionaryIds.push(dictionary.id);
          }
        });

        let options = {
          url: url,
          json: true,
          body: dictionaries,
          headers: {
            'x-auth-token': userStatus.token
          }
        }

        request.post(options, function(error, response, body) {
          debug('DICTIONARIES ERROR', error);
          debug('DICTIONARIES', body);
          resolve(dictionaryIds);
        });
      });
    });
  }

  __requestUserSearchCounts(dictionaryIds, userToken) {
    let that = this;

    return new Promise(function(resolve, reject) {
      dictionaryIds.forEach((dictionaryId)=>{
        // we couldn't access userSearchCounts through dictionaries like dictionaries.getUserSearchCounts
        // even though sequelize doc says we could!
        UserSearchCountQueries.getUserSearchCountsByDictionaryId(dictionaryId).then(function (userSearchCounts) {
          let url = ApiUrls.POST_USER_SEARCH_COUNT(dictionaryId);

          userSearchCounts.forEach((userSearchCount)=>{
            that.__convertDateFormat(userSearchCount);
          });

          let options = {
            url: url,
            json: true,
            body: userSearchCounts,
            headers: {
              'x-auth-token': userToken
            }
          }

          request.post(options, function(error, response, body) {
            debug('USER SEARCH COUNTS ERROR', error);
            debug('USER SEARCH COUNTS', body);
            resolve();
          });
        });
      });
    });
  }

  __requestDefinitions(dictionaryIds, userToken) {
    let that = this;
    return new Promise(function(resolve, reject) {
      dictionaryIds.forEach((dictionaryId)=>{
        DefinitionQueries.getAllDefinitionsByDictionaryId(dictionaryId).then((definitions)=>{
          let url = ApiUrls.POST_DEFINITIONS(dictionaryId);

          definitions.forEach((definition)=>{
            that.__convertDateFormat(definition);
          });

          let options = {
            url: url,
            json: true,
            body: definitions,
            headers: {
              'x-auth-token': userToken
            }
          }

          request.post(options, function(error, response, body) {
            debug('DEFINITIONS ERROR', error);
            debug('DEFINITIONS', body);
            resolve();
          });
        });
      });
    });
  }

  __convertDateFormat(model) {
    let convertedCreationDate = new Date(model.createdAt).getTime();
    let convertedUpdateDate = new Date(model.updatedAt).getTime();
    model.createdAt = convertedCreationDate;
    model.updatedAt = convertedUpdateDate;
  }

  stop() {
    clearInterval(intervalHandler);
  }
}

module.exports = new Sync();
