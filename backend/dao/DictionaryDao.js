/* Copyright (c) 2015 Kod Gemisi Ltd.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

const ipc = require('electron').ipcMain;
const actions = require('../../app/actions/constants/dictionary');
const Dictionary = require('../model/Dictionary');
const Definition = require('../model/Definition');
const debug = require('debug')(__filename.split('/').pop());

ipc.removeAllListeners(actions.LOAD_DICTIONARIES);
ipc.removeAllListeners(actions.CREATE_DICTIONARY);
ipc.removeAllListeners(actions.EDIT_DICTIONARY);
ipc.removeAllListeners(actions.CHANGE_ACTIVENESS_OF_DICTIONARY);
ipc.removeAllListeners(actions.CHANGE_ACTIVENESS_OF_DICTIONARIES);
ipc.removeAllListeners(actions.DELETE_DICTIONARY);
ipc.removeAllListeners(actions.LOAD_DEFINITIONS_BY_DICTIONARY_ID);

ipc.on(actions.LOAD_DICTIONARIES, (event) => {
  debug(actions.LOAD_DICTIONARIES);

  Dictionary.findAll({ where: { deleted: false } }).then(resultSet => {
    const dictionaries = resultSet.map(dictionary => dictionary.toJSON());
    event.sender.send(actions.DICTIONARIES_LOADED, dictionaries);
  }).catch(e => debug(e));
});

ipc.on(actions.CREATE_DICTIONARY, (event, dictionary) => {
  debug(actions.CREATE_DICTIONARY, dictionary);

  Dictionary.create(dictionary).then(createdDictionary => {
    event.sender.send(actions.DICTIONARY_CREATED, createdDictionary.toJSON());
  }).catch(e => debug(e));
});

ipc.on(actions.EDIT_DICTIONARY, (event, dictionary) => {
  debug(actions.EDIT_DICTIONARY, dictionary);

  Dictionary.findById(dictionary.id).then(persistentDictionary => {
    persistentDictionary.update(dictionary).then(editedDictionary => {
      event.sender.send(actions.DICTIONARY_EDITED, editedDictionary.toJSON());
    }).catch(e => debug(e));
  }).catch(e => debug(e));
});

ipc.on(actions.CHANGE_ACTIVENESS_OF_DICTIONARY, (event, dictionaryId) => {
  debug(actions.CHANGE_ACTIVENESS_OF_DICTIONARY, dictionaryId);

  Dictionary.findById(dictionaryId).then(dictionary => {
    dictionary.update({ active: !dictionary.active }).then(editedDictionary => {
      event.sender.send(actions.DICTIONARY_ACTIVENESS_CHANGED, editedDictionary.id);
    }).catch(e => debug(e));
  }).catch(e => debug(e));
});

ipc.on(actions.CHANGE_ACTIVENESS_OF_DICTIONARIES, (event, dictionaryIds) => {
  debug(actions.CHANGE_ACTIVENESS_OF_DICTIONARIES, dictionaryIds);

  Dictionary.findAll().then(dictionaries => {
    const promises = dictionaries.map(dict => dict.update({ active: dictionaryIds.indexOf(dict.id.toString()) > -1 }));

    Promise.all(promises).then(() => {
      event.sender.send(actions.DICTIONARIES_ACTIVENESS_CHANGED);
    });
  }).catch(e => debug(e));
});

ipc.on(actions.DELETE_DICTIONARY, (event, dictionaryId) => {
  debug(actions.DELETE_DICTIONARY, dictionaryId);

  Dictionary.findById(dictionaryId).then(dictionary => {
    dictionary.update({ deleted: true }).then(deletedDictionary => {
      event.sender.send(actions.DICTIONARY_DELETED, deletedDictionary.id);
    }).catch(e => debug(e));
  }).catch(e => debug(e));
});

ipc.on(actions.LOAD_DEFINITIONS_BY_DICTIONARY_ID, (event, dictionaryId) => {
  debug(actions.LOAD_DEFINITIONS_BY_DICTIONARY_ID, dictionaryId);

  Dictionary.findById(dictionaryId).then(dictionary => {
    dictionary.getDefinitions().then(definitions => {
      event.sender.send(actions.DEFINITIONS_BY_DICTIONARY_ID_LOADED, definitions.map(def => def.toJSON()));
    }).catch(e => debug(e));
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
