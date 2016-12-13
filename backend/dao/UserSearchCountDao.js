/* Copyright (c) 2015 Kod Gemisi Ltd.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

const ipc = require('electron').ipcMain;
const actions = require('../../app/actions/constants/study');
const UserSearchCount = require('../model/UserSearchCount');
const Definition = require('../model/Definition');
const debug = require('debug')(__filename.split('/').pop());

ipc.removeAllListeners(actions.START_STUDY);

ipc.on(actions.START_STUDY, (event, dictionaryId) => {
  getStudyWordsBySearchCount(dictionaryId).then(words => {
    const promises = [];
    words.forEach(word => {
      debug('definition', word.getDataValue('definition'));
      promises.push(getDefinitionsByDictionaryAndWord(word.getDataValue('definition'), dictionaryId));
    });
    Promise.all(promises).then(definitions => {
      const definitionObj = {};
      definitions.forEach(definition => {
        definitionObj[definition.getDataValue('id')] = definition.toJSON();
      });
      debug('study definitions', definitionObj);
      event.sender.send(actions.STUDY_READY, definitionObj);
    });
  }).catch(e => debug(e));
});

const getDefinitionsByDictionaryAndWord = (word, dictionaryId) => {
  return Definition.findOne({
    where: { key: word, dictionaryId },
    order: [['createdAt', 'ASC']]
  });
};

const getStudyWordsBySearchCount = (dictionaryId) => {
  return UserSearchCount.findAll({
    attributes: ['definition'],
    where: { dictionaryId },
    order: [['count', 'DESC']]
  });
};

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
