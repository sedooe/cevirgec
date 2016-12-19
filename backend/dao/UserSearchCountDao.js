/* Copyright (c) 2015 Kod Gemisi Ltd.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

const Sequelize = require('sequelize');
const ipc = require('electron').ipcMain;
const studyActions = require('../../app/actions/constants/study');
const quizActions = require('../../app/actions/constants/quiz');
const UserSearchCount = require('../model/UserSearchCount');
const StudyQuizResults = require('../model/StudyQuizResults');
const Dictionary = require('../model/Dictionary');
const Definition = require('../model/Definition');
const { numberOfDefinitionsByDictionary, produceWrongChoicesForQuiz } = require('./DefinitionDao');
const debug = require('debug')(__filename.split('/').pop());

ipc.removeAllListeners(studyActions.START_STUDY);
ipc.removeAllListeners(quizActions.START_QUIZ);

ipc.on(studyActions.START_STUDY, (event, dictionaryId) => {
  debug(studyActions.START_STUDY, dictionaryId);

  produceStudyQuizDefinitions(dictionaryId).then(definitions => {
    debug('studyDefinitions', definitions);
    event.sender.send(studyActions.STUDY_READY, definitions);
  }).catch(e => event.sender.send(studyActions.STUDY_REJECTED, e));
});

ipc.on(quizActions.START_QUIZ, (event, dictionaryId) => {
  debug(quizActions.START_QUIZ, dictionaryId);

  produceStudyQuizDefinitions(dictionaryId).then(definitions => {
    debug('quizDefinitions', definitions);
    const promises = [];
    Object.keys(definitions).forEach(key => {
      promises.push(produceWrongChoicesForQuiz(definitions[key]));
    });
    Promise.all(promises).then(quizChoicesOfAllDefinitions => {
      quizChoicesOfAllDefinitions.forEach(quizChoicesOfDefinition => {
        Object.keys(quizChoicesOfDefinition).forEach(key => {
          quizChoicesOfDefinition[key].push(definitions[key].value); // pushing correct answer into choices
          shuffle(quizChoicesOfDefinition[key]);
          definitions[key].choices = quizChoicesOfDefinition[key];
        });
        debug('quizDefinitions', definitions);
      });
      event.sender.send(quizActions.QUIZ_READY, definitions);      
    }).catch(e => debug(e));
  }).catch(e => event.sender.send(quizActions.QUIZ_REJECTED, e));
});

const produceStudyQuizDefinitions = (dictionaryId) => {
  return new Promise((resolve, reject) => {
    numberOfDefinitionsByDictionary(dictionaryId).then(count => {
      if (count < 5) {
        reject('To study/quiz you must have at least 5 definitions in the selected dictionary.');
      } else {
        getStudyDefinitionsByPoint(dictionaryId).then(pointBasedDefinitions => {
          getStudyDefinitionsRandomly(dictionaryId, pointBasedDefinitions.definitionIds).then(randomDefinitions => {
            resolve(Object.assign({}, pointBasedDefinitions.definitionsObj, randomDefinitions));
          }).catch(e => debug(e));
        }).catch(e => debug(e));
      }
    }).catch(e => debug(e));
  })
}

const getStudyDefinitionsRandomly = (dictionaryId, definitionIds) => {
  const includeObject = { model: Definition };
  if (Object.keys(definitionIds).length) {
    includeObject.where = { id: { $notIn: definitionIds } };
  }
  return new Promise(resolve => {
    Dictionary.findOne({
      where: { id: dictionaryId },
      include: [includeObject],
      order: [
        [Sequelize.fn('RANDOM')]
      ]
    }).then(dictionary => {
      if (!dictionary) {
        resolve({});
        return;
      }
      const definitionsObj = {};
      dictionary.definitions.some((definition, index) => {
        definitionsObj[definition.getDataValue('id')] = definition.toJSON();
        return index === 4;
      });
      resolve(definitionsObj);
    }).catch(e => debug(e));
  });
};

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
      if (!dictionary) { // dictionary is null when there is no studyQuizResult associated to one of its definitions. because of {required: true}
        resolve({ definitionIds: {}, definitionsObj: {} });
        return;
      }
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

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items The array containing the items.
 */
const shuffle = a => {
  for (let i = a.length; i; i--) {
    const j = Math.floor(Math.random() * i);
    [a[i - 1], a[j]] = [a[j], a[i - 1]];
  }
}

module.exports = { upsertSearchCount: upsertSearchCount };
