const ipc = require('electron').ipcMain;
const actions = require('../../app/actions/constants/settings');
const PreferencesHelper = require('../PreferencesHelper');
const debug = require('debug')(__filename.split('/').pop());

ipc.removeAllListeners(actions.LOAD_ALL_SETTINGS);
ipc.removeAllListeners(actions.CHANGE_VERBOSITY);

ipc.on(actions.LOAD_ALL_SETTINGS, (event) => {
  debug(actions.LOAD_ALL_SETTINGS);

  event.sender.send(actions.ALL_SETTINGS_LOADED, PreferencesHelper.getSettings());
});

ipc.on(actions.CHANGE_VERBOSITY, (event) => {
  debug(actions.CHANGE_VERBOSITY);

  PreferencesHelper.toggleVerbosity();

  event.sender.send(actions.VERBOSITY_CHANGED, PreferencesHelper.getSettings().verbose);
});
