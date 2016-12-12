/* Copyright (c) 2015 Kod Gemisi Ltd.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';

const ipc = require("electron").ipcMain;
const UserSearchCount = require('../model/UserSearchCount');
const DatabaseEvents = {};
const UiEvents = {};
const debug = require('debug')(__filename.split('/').pop());

ipc.on(UiEvents.UPSERT_SEARCH_COUNT, function(event, word, activeDictionaryIds) {
  debug(UiEvents.UPSERT_SEARCH_COUNT, word, activeDictionaryIds);

  activeDictionaryIds.forEach((dictionaryId)=>{
    upsert(word, dictionaryId);
  });

  let userSearchCount = {'definition': word, 'dictionaryId': activeDictionaryIds[0]};
});

function upsert(word, dictionaryId) {
  UserSearchCount.findOne({where: {definition: word, dictionaryId: dictionaryId}})
    .then(function (userSearchCount) {
      if (userSearchCount == null) {
        UserSearchCount.create({'definition': word, 'dictionaryId': dictionaryId});
      } else {
        let incrementedValue = userSearchCount.getDataValue('count') + 1;
        userSearchCount.setDataValue('count', incrementedValue);
        userSearchCount.save();
      }
    });
}

const upsertSearchCount = (word, dictionaryIds) => {
  UserSearchCount.findAll({ where: { definition: word, dictionaryId: dictionaryIds } }).then(resultSet => {

    // update
    resultSet.forEach(searchCount => {
      debug('dictionaryId', searchCount.getDataValue('dictionaryId'));
      const index = dictionaryIds.indexOf(searchCount.getDataValue('dictionaryId'));
      dictionaryIds.splice(index, 1); // delete updated ones
      const incrementedValue = searchCount.getDataValue('count') + 1;
      searchCount.setDataValue('count', incrementedValue);
      searchCount.save();
    });

    // create
    dictionaryIds.forEach(id => UserSearchCount.create({ definition: word, dictionaryId: id }));
  }).catch(e => debug(e));
};

module.exports = { upsertSearchCount: upsertSearchCount };
