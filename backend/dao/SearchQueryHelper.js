/* Copyright (c) 2015 Kod Gemisi Ltd.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';

const Definition = require('../model/Definition');
const Dictionary = require('../model/Dictionary');
const debug = require('debug')(__filename.split('/').pop());

// This function is used when results are shown
function searchWordInActiveDictionaries(word, callback) {

  Dictionary.findAll({
    where: {
      active: true
    },
    include: [
      { model: Definition, where: { key: word }}
    ]
  })
  .then((resultArray) => {
    callback(resultArray);
  });

}

module.exports = {searchWordInActiveDictionaries};
