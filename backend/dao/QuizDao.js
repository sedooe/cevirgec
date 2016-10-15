/* Copyright (c) 2015 Kod Gemisi Ltd.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';

const ipc = require("electron").ipcMain;
const ApiUrls = {};
const DatabaseEvents = {};
const UiEvents = {};
const sync = require('../Sync');
const request = require('request');
const debug = require('debug')(__filename.split('/').pop());

ipc.on(UiEvents.UPSERT_ANSWERED_WORD_COUNTS, function(event, correctWrongMap, dictionaryId, userToken) {
  debug(UiEvents.UPSERT_ANSWERED_WORD_COUNTS, correctWrongMap, dictionaryId, userToken);

  let url = ApiUrls.POST_ANSWERED_WORD_COUNT(dictionaryId);

  let options = {
    url: url,
    json: true,
    body: correctWrongMap,
    headers: {
      'x-auth-token': userToken
    }
  }

  request.post(options, function(error, response, body) {
    debug(body);
  });
});

ipc.on(UiEvents.SYNC_SOURCES, function(event, userStatus) {
  debug(UiEvents.SYNC_SOURCES, userStatus);

  sync.syncSources(userStatus).then(()=>{
    event.sender.send(DatabaseEvents.SOURCES_ARE_SYNCED);
  });
});

module.exports = 'DAOs are event based so we just initialize them on main.js but not need to expilictly use them';
