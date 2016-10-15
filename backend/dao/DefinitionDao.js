/* Copyright (c) 2015 Kod Gemisi Ltd.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';

const ipc = require("electron").ipcMain;
const Definition = require('../model/Definition');
const Dictionary = require('../model/Dictionary');
const Sync = require('../Sync');
const UserSearchCountQueries = require('./queries/UserSearchCountQueries');
const DefinitionQueries = require('./queries/DefinitionQueries');
const DatabaseEvents = {};
const UiEvents = {};
const debug = require('debug')(__filename.split('/').pop());

// This function is used when NewDefinitionWindow active
ipc.on(UiEvents.SEARCH_WORD, function(event, data) {
  debug(UiEvents.SEARCH_WORD, data);

  let activeDictionaryIds = data['activeDictionaryIds'];
  let word = data['word'];

  Definition.findAll({
    where: {
      dictionaryId: activeDictionaryIds,
      key: word
    },
    include: [Dictionary],
    order: ['dictionaryId']
  }).then(function(resultArray) {

    //convert array of objects to object
    let resultObject = {};
    for (let i = 0; i < resultArray.length; i++) {
      resultObject[resultArray[i].id] = resultArray[i].toJSON();
    }

    // FIXME in order for existing definitions' dictionaries to be ordered on
    // NewDefinitionWindow we need to send result as (sorted) array to UI and
    // convert the array into an ordered map in the ui. So that we will be able
    // to preserve dictionary grouping in the map. However if we convert the array
    // to map here the order is lost due to unordered nature of native json maps.

    event.sender.send(DatabaseEvents.SEARCH_WORD_RESULT_READY, resultObject);
  });

});

ipc.on(UiEvents.LOAD_ALL_DEFINITIONS, function(event, data) {
  debug(UiEvents.LOAD_ALL_DEFINITIONS);

  DefinitionQueries.getAllDefinitions().then(function(definitions) {
    event.sender.send(DatabaseEvents.ALL_DEFINITIONS_READY, definitions);
  });
});

ipc.on(UiEvents.CREATE_DEFINITION, function(event, data) {
  debug(UiEvents.CREATE_DEFINITION, data);

  Definition.create(data)
    .then(function successHandler (createdDefinition) {
      debug('Definition Create successHandler')
      event.sender.send(DatabaseEvents.DEFINITION_CREATED, createdDefinition.toJSON());
    }, function errorHandler(argument) {
      debug(argument);
    });
});

ipc.on(UiEvents.SAVE_DEFINITIONS, function(event, data) {
  debug(UiEvents.SAVE_DEFINITIONS, data);

  /* there are two reasons to split data into 2 groups as 'updateArray' and 'definitions'
     first one: sequelize does not have upsert method
     second one: to avoid inserting an updated word into irrelevant dictionary */

  let updateArray = [];

  for (let i = data.definitions.length-1; i >= 0; i--) {
    if (data.definitions[i].id) {
      updateArray.push(data.definitions[i]);
      data.definitions.splice(i, 1);
    }
  }

  let definitions = [];

  data.dictionaryIds.forEach((dictionaryId)=>{
    data.definitions.forEach((definition)=>{
      definition.dictionaryId = dictionaryId;
      definitions.push(clone(definition));
    })
  });

  Definition.bulkCreate(definitions).then(()=>{
    event.sender.send(DatabaseEvents.DEFINITION_CREATED, {});
  });

  debug('UPDATEARRAY', updateArray);
  debug('DEFINITIONS', definitions);

  updateArray.forEach((definition)=>{
    Definition.update(
      definition,
      {
        where: {id: definition.id},
        fields: ['key', 'value', 'usage', 'notes', 'type', 'sex']
      }
    ).catch(function(error) {
      console.log("Update failed: " + error);
    });
  });

});

function clone(a) {
  return JSON.parse(JSON.stringify(a));
}

module.exports = 'DAOs are event based so we just initialize them on main.js but not need to expilictly use them';
