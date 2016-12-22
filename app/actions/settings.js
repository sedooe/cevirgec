// @flow
import * as actions from './constants/settings';
const { ipcRenderer } = require('electron');

const requestLoadAllSettings = () => ({
  type: actions.REQUEST_LOAD_ALL_SETTINGS
});

export const loadAllSettings = () => (dispatch: Function) => {
  dispatch(requestLoadAllSettings());
  ipcRenderer.send(actions.LOAD_ALL_SETTINGS);
};

const requestChangeVerbosity = () => ({
  type: actions.REQUEST_CHANGE_VERBOSITY
});

export const changeVerbosity = () => (dispatch: Function) => {
  dispatch(requestChangeVerbosity());
  ipcRenderer.send(actions.CHANGE_VERBOSITY);
};
