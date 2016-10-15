/* Copyright (c) 2015 Kod Gemisi Ltd.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';

const ipc = require("electron").ipcMain;
const OnlineSources = require('../model/OnlineSource');
const DatabaseEvents = {};
const UiEvents = {};
const debug = require('debug')(__filename.split('/').pop());

ipc.on(UiEvents.LOAD_ALL_ONLINE_SOURCES, function(event, data) {
  debug(UiEvents.LOAD_ALL_ONLINE_SOURCES);

  OnlineSources.findAll({order: ['index']})
    .then((resultArray)=>{
      let values = resultArray
        .map(function (entity) {
          return entity.toJSON();
        });

      event.sender.send(DatabaseEvents.ONLINE_SOURCES_READY, values);
    });
});

ipc.on(UiEvents.LOAD_ONLINE_SOURCES_BY_LANGUAGE, function(event, data) {
  debug(UiEvents.LOAD_ONLINE_SOURCES_BY_LANGUAGE);

  OnlineSources.findAll({where: {sourceLang: data}})
    .then((resultArray)=>{
      let values = resultArray.map(function (entity) {
        return entity.toJSON();
      });

      event.sender.send(DatabaseEvents.ONLINE_SOURCES_BY_LANGUAGE_READY, values);
    });
});

ipc.on(UiEvents.DELETE_ONLINE_SOURCE, function(event, data) {
  debug(UiEvents.DELETE_ONLINE_SOURCE);

  OnlineSources.destroy({where: {id: data}}).then((resultArray)=>{
      event.sender.send(DatabaseEvents.ONLINE_SOURCE_DELETED, data);
    });
});

ipc.on(UiEvents.UPSERT_ONLINE_SOURCE, function(event, data) {
  debug(UiEvents.UPSERT_ONLINE_SOURCE);

  // avoid upsert since it can't give the created/updated model in callback
  // due to sqlite limitation. See `Note` on http://docs.sequelizejs.com/en/latest/api/model/#upsertvalues-options-promisecreated
  if(data.id){
    OnlineSources.update(data, {where: {id: data.id}}).then(()=>{
      // in update affacted row cannot be returened due to sqlite limitation, an array of count is returened instead.
      // See http://docs.sequelizejs.com/en/latest/api/model/#updatevalues-options-promisearrayaffectedcount-affectedrows
      event.sender.send(DatabaseEvents.ONLINE_SOURCE_CREATED, data);
    });
  }
  else{
    OnlineSources.create(data).then((createdModel)=>{
      event.sender.send(DatabaseEvents.ONLINE_SOURCE_CREATED, createdModel.toJSON());
    });
  }

});


module.exports = 'DAOs are event based so we just initialize them on main.js but not need to expilictly use them';
