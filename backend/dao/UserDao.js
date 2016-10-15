/* Copyright (c) 2015 Kod Gemisi Ltd.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';

const ipc = require("electron").ipcMain;
const User = require('../model/User');
const UserQueries = require('./queries/UserQueries');
const DictionaryQueries = require('./queries/DictionaryQueries');
const DefinitionQueries = require('./queries/DefinitionQueries');
const SoldListingQueries = require('./queries/SoldListingQueries');
const UserSearchCountQueries = require('./queries/UserSearchCountQueries');
const UiEvents = {};
const ApiUrls = {};
const request = require('request');
const debug = require('debug')(__filename.split('/').pop());

ipc.on(UiEvents.USER_REGISTER, function(event, user) {
  debug(UiEvents.USER_REGISTER, user);

  User.create(user);
});

ipc.on(UiEvents.FETCH_DATA_FROM_SERVER, function(event, user, userToken) {
  debug(UiEvents.FETCH_DATA_FROM_SERVER, user);

  UserQueries.upsert(user).then(()=>{
    user.dictionaries.forEach((dictionary)=>{
      dictionary['userId'] = user.id;
      DictionaryQueries.upsert(dictionary).then(()=>{
        dictionary.definitions.forEach((definition)=>{
          definition['dictionaryId'] = dictionary.id;
          DefinitionQueries.upsert(definition);
        });
        dictionary.userSearchCounts.forEach((userSearchCount)=>{
          userSearchCount['dictionaryId'] = dictionary.id;
          UserSearchCountQueries.upsert(userSearchCount);
        });
      });
    });
  });

  __getListings(user, userToken).then((listings)=>{
    listings.forEach((listing)=>{
      SoldListingQueries.isExist(listing, user).then((exist)=>{
        let soldListing = {listingId: listing.id, userId: user.id};
        if (!exist) {
          SoldListingQueries.create(soldListing);
          __saveDictionaryWithDefinitions(listing.dictionary, user);
        }
      });
    });
  });

});

function __saveDictionaryWithDefinitions(dictionary, user) {
  delete dictionary['id'];
  delete dictionary['userSearchCounts'];
  delete dictionary['answeredWordCounts'];
  delete dictionary['createdAt'];
  delete dictionary['updatedAt'];
  dictionary['userId'] = user.id;

  DictionaryQueries.create(dictionary).then((newDictionary)=>{
    dictionary.definitions.forEach((definition)=>{
      delete definition['id'];
      delete definition['createdAt'];
      delete definition['updatedAt'];
      definition['dictionaryId'] = newDictionary.id;
      DefinitionQueries.create(definition);
    });
  });
}

function __getListings(user, userToken) {
  return new Promise(function(resolve, reject) {
    let url = ApiUrls.GET_LISTINGS(user.username);

    let options = {
      url: url,
      json: true,
      headers: {
        'x-auth-token': userToken
      }
    };

    request.get(options, function(error, response, body) {
      debug('LISTINGS', body);
      resolve(body);
    });
  });
}

module.exports = 'DAOs are event based so we just initialize them on main.js but not need to expilictly use them';
