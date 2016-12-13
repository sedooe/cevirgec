/* Copyright (c) 2015 Kod Gemisi Ltd.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

const ipc = require('electron').ipcMain;
const actions = require('../../app/actions/constants/study');
const StudyQuizResults = require('../model/StudyQuizResults');
const Definition = require('../model/Definition');
const debug = require('debug')(__filename.split('/').pop());


