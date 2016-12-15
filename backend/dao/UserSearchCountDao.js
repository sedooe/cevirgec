/* Copyright (c) 2015 Kod Gemisi Ltd.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

const Sequelize = require('sequelize');
const ipc = require('electron').ipcMain;
const actions = require('../../app/actions/constants/study');
const UserSearchCount = require('../model/UserSearchCount');
const StudyQuizResults = require('../model/StudyQuizResults');
const Dictionary = require('../model/Dictionary');
const Definition = require('../model/Definition');
const debug = require('debug')(__filename.split('/').pop());

ipc.removeAllListeners(actions.START_STUDY);

ipc.on(actions.START_STUDY, (event, dictionaryId) => {
  debug(actions.START_STUDY, dictionaryId);

  getStudyDefinitionsByPoint(dictionaryId).then(pointBasedDefinitions => {
    getStudyDefinitionsRandomly(dictionaryId, pointBasedDefinitions.definitionIds).then(randomDefinitions => {
      const studyDefinitions = Object.assign({}, pointBasedDefinitions.definitionsObj, randomDefinitions);
      debug('studyDefinitions', studyDefinitions);
      event.sender.send(actions.STUDY_READY, studyDefinitions);
    }).catch(e => debug(e));
  }).catch(e => debug(e));
});

const getStudyDefinitionsRandomly = (dictionaryId, definitionIds) => {
  return new Promise(resolve => {
    Dictionary.findOne({
      where: { id: dictionaryId },
      include: [{
        model: Definition,
        where: { id: { $notIn: definitionIds } }
      }],
      order: [
        [Sequelize.fn('RANDOM')]
      ]
    }).then(dictionary => {
      const definitionsObj = {};
      dictionary.definitions.some((definition, index) => {
        definitionsObj[definition.getDataValue('id')] = definition.toJSON();
        return index === 4;
      });
      resolve(definitionsObj);
    });
  }).catch(e => debug(e));
}

const getStudyDefinitionsByPoint = (dictionaryId) => {
  return new Promise(resolve => {
    Dictionary.findOne({
      where: { id: dictionaryId },
      include: [{
        model: Definition, // no need to write {where: dictionaryId}
        include: [{
          model: StudyQuizResults,
          required: true,
          attributes: []
        }],
      }],
      order: [
        [Definition, StudyQuizResults, 'point', 'DESC']
      ]
    }).then(dictionary => {
      const definitionIds = [];
      const definitionsObj = {};
      dictionary.getDataValue('definitions').some((definition, index) => {
        const id = definition.getDataValue('id');
        definitionIds.push(id);
        definitionsObj[id] = definition.toJSON();
        return index === 4; // sequelize's limit is problematic inside include: https://github.com/sequelize/sequelize/issues/1897
      });
      resolve({ definitionIds, definitionsObj });
    });
  }).catch(e => debug(e));
};

const upsertSearchCount = (word, dictionaryIds) => {
  debug('UserSearchCount', UserSearchCount);
  UserSearchCount.findAll({ where: { definition: word, dictionaryId: dictionaryIds } }).then(resultSet => {

    // update
    resultSet.forEach(searchCount => {
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
