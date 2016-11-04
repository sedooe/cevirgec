/* Copyright (c) 2015 Kod Gemisi Ltd.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

const ipc = require('electron').ipcMain;
const actions = require('../../app/actions/constants');
const Dictionary = require('../model/Dictionary');
const Definition = require('../model/Definition');
const DatabaseEvents = {};
const UiEvents = {};
const DictionaryQueries = require('./queries/DictionaryQueries');
const debug = require('debug')(__filename.split('/').pop());

ipc.on(actions.CREATE_DICTIONARY, (event, dictionary) => {
  Dictionary.create(dictionary).then(createdDictionary => {
    event.sender.send(actions.DICTIONARY_CREATED, createdDictionary.toJSON());
  }).catch(e => debug(e));
});

// ipc.on(UiEvents.LOAD_ALL_DICTIONARIES, function(event, data, userId) {
//   debug(UiEvents.LOAD_ALL_DICTIONARIES, userId);

//   DictionaryQueries.getDictionariesByUserId(userId).then(function (dictionaries) {
//     event.sender.send(DatabaseEvents.DICTIONARIES_READY, dictionaries);
//   });
// });

// ipc.on(UiEvents.LOAD_DICTIONARY_BY_ID, function(event, dictionaryId) {
//   debug(UiEvents.LOAD_DICTIONARY_BY_ID, dictionaryId);

//   Dictionary.findAll({where: {id: dictionaryId, deleted: false}})
//     .then(function (resultArray) {
//       let values = resultArray.map((entity)=>{
//         return entity.toJSON();
//       });
//       event.sender.send(DatabaseEvents.DICTIONARIES_READY, values);
//     });
// });

// ipc.on(UiEvents.CREATE_DICTIONARY, function(event, dictionaryObj, userId) {
//   debug(UiEvents.CREATE_DICTIONARY, dictionaryObj);

//   dictionaryObj.userId = userId;

//   Dictionary.create(dictionaryObj)
//     .then(function (createdModel) {
//       event.sender.send(DatabaseEvents.DICTIONARY_CREATED, createdModel.toJSON());
//     });

// });

// ipc.on(UiEvents.UPDATE_DICTIONARY, function(event, dictionaryObj) {
//   debug(UiEvents.UPDATE_DICTIONARY, dictionaryObj);

//   Dictionary.findById(dictionaryObj.id).then((dictionary) => {
//     dictionary.update(dictionaryObj).then((updatedDictionary) => {
//       event.sender.send(DatabaseEvents.DICTIONARY_UPDATED, updatedDictionary.toJSON());
//     });
//   });

// });

// ipc.on(UiEvents.LOAD_DEFINITIONS_OF_DICTIONARY, function(event, dictionaryId) {
//   debug(UiEvents.LOAD_DEFINITIONS_OF_DICTIONARY, dictionaryId);

//   Definition.findAll({where: {dictionaryId: dictionaryId}, orderBy: ['key', 'updatedAt']})
//     .then(function (resultArray) {
//       let values = resultArray
//         .map(function (entity) {
//           return entity.toJSON();
//         });
//       event.sender.send(DatabaseEvents.DEFINITIONS_OF_DICTIONARY_READY, {
//         dictionaryId: dictionaryId,
//         definitions: values
//       });
//     });
// });

// ipc.on(UiEvents.DELETE_DICTIONARY, function(event, dictionaryId) {
//   debug(UiEvents.DELETE_DICTIONARY, dictionaryId);

//   Dictionary.findById(dictionaryId).then((dictionary) => {
//     dictionary.update({deleted: true}).then((deletedDictionary) => {
//       event.sender.send(DatabaseEvents.DICTIONARY_DELETED, deletedDictionary.id);
//     });
//   });
// });

// ipc.on(UiEvents.CONTEXT_PREDICTION_SUCCESS, function(event, userId, context) {
//   debug(UiEvents.CONTEXT_PREDICTION_SUCCESS, userId, context);

//   DictionaryQueries.getDictionariesByUserIdAndContext(userId, context).then((dictionaries)=>{
//     event.sender.send(DatabaseEvents.CONTEXT_RELATED_DICTIONARIES_READY, dictionaries);
//   });
// });

module.exports = 'DAOs are event based so we just initialize them on main.js but not need to expilictly use them';
