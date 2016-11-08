/* Copyright (c) 2015 Kod Gemisi Ltd.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

 'use strict';

 const ipc = require("electron").ipcMain;
 const DatabaseEvents = {};
 const UiEvents = {};
 const PreferencesHelper = require('../PreferencesHelper');
 const ShortcutHelper = require('../ShortcutHelper');
 const UserStatusHelper = require('../UserStatusHelper');
 const ApplicationHelper = require('../ApplicationHelper');
 // const sync = require('../Sync');
 const ApiUrls = '../../app/api/urls/ApiUrls';
 const debug = require('debug')(__filename.split('/').pop());

 ipc.on(UiEvents.LOAD_ALL_SETTINGS, function(event) {
   debug(UiEvents.LOAD_ALL_SETTINGS);

   let settings = PreferencesHelper.getSettings();

   event.sender.send(DatabaseEvents.LOAD_ALL_SETTINGS_READY, settings);
 });

ipc.on(UiEvents.UPDATE_ALL_SETTINGS, function(event, data) {
  debug(UiEvents.UPDATE_ALL_SETTINGS, data);

  PreferencesHelper.updateSettings(data);
  let settings = PreferencesHelper.getSettings();

  // need to send callback since we don't use optimistic ui
  event.sender.send(DatabaseEvents.LOAD_ALL_SETTINGS_READY, settings);
});

ipc.on(UiEvents.TOGGLE_USER_STATUS_AND_TRIGGER_ACTIONS, function(event, userStatus) {
  debug(UiEvents.TOGGLE_USER_STATUS_AND_TRIGGER_ACTIONS, userStatus);

  UserStatusHelper.setUserStatus(userStatus);

  if (userStatus.loggedIn) {
    ShortcutHelper.registerGlobalShortcuts();
    sync.start(userStatus);
  } else {
    ShortcutHelper.unregisterAll();
    sync.stop();
  }

  ApplicationHelper.setContextMenu(userStatus.loggedIn);

  event.sender.send(DatabaseEvents.USER_STATUS_TOGGLED, userStatus.loggedIn);
});

module.exports = 'DAOs are event based so we just initialize them on main.js but not need to expilictly use them';
