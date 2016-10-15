/* Copyright (c) 2015 Kod Gemisi Ltd.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';

const User = require('../../model/User');
const debug = require('debug')(__filename.split('/').pop());

function upsert(user) {
  return new Promise(function (resolve, reject) {
    User.findOne({where: {id: user.id}})
    .then(function (userLocal) {
      if (userLocal == null) {
        User.create(user);
      } else {
        User.update(user, {where: {id: user.id}});
      }
      resolve();
    });
  });
}

module.exports = {upsert};
