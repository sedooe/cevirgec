/* Copyright (c) 2015 Kod Gemisi Ltd.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

const ipc = require('electron').ipcMain;
const actions = require('../../app/actions/constants/study');
const StudyQuizResults = require('../model/StudyQuizResults');
const { getDefinitionsByDictionaryAndWord } = require('./DefinitionDao');
const debug = require('debug')(__filename.split('/').pop());

ipc.removeAllListeners(actions.FINISH_STUDY);

ipc.on(actions.FINISH_STUDY, (event, data) => {
  debug(actions.FINISH_STUDY, data);

  upsertResults(data);
});

const upsertResults = resultsObject => {
  const definitionIds = Object.keys(resultsObject);

  StudyQuizResults.findAll({ where: { definitionId: definitionIds } }).then(resultSet => {
    resultSet.forEach(result => {
      const definitionId = result.getDataValue('definitionId');
      let point = result.getDataValue('point');
      resultsObject[definitionId] ? point-- : point++;
      result.setDataValue('point', point);
      result.save();
      const index = definitionIds.indexOf(definitionId);
      definitionIds.splice(index, 1); // delete updated ones
    });

    definitionIds.forEach(definitionId => {
      const point = resultsObject[definitionId] ? -1 : 1;
      StudyQuizResults.create({ definitionId, point });
    });
  }).catch(e => debug(e));
};

const upsertPointByDefinitionId = definitionIds => {
  StudyQuizResults.findAll({ where: { definitionId: definitionIds } }).then(results => {
    results.forEach(result => {
      const point = result.getDataValue('point');
      const index = definitionIds.valueOf(result.getDataValue('definitionId'));
      result.setDataValue('point', point + 1);
      result.save();
      definitionIds.splice(index, 1);
    });

    definitionIds.forEach(definitionId => StudyQuizResults.create({ definitionId, point: 1 }));
  }).catch(e => debug(e));
};

const triggerChangeDefinitionPoint = (word, dictionaryId) => {
  getDefinitionsByDictionaryAndWord(word, dictionaryId).then(definitions => {
    const definitionIds = definitions.map(definition => definition.getDataValue('id'));
    upsertPointByDefinitionId(definitionIds);
  }).catch(e => debug(e));
};

module.exports = {
  upsertPointByDefinitionId: upsertPointByDefinitionId,
  triggerChangeDefinitionPoint: triggerChangeDefinitionPoint
};
