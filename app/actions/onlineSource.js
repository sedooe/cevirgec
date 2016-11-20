// @flow
import * as actions from './constants';
const { ipcRenderer } = require('electron');

const requestLoadOnlineSources = () => ({
  type: actions.REQUEST_LOAD_ONLINE_SOURCES
})

export const loadOnlineSources = () => (dispatch: Function) => {
  dispatch(requestLoadOnlineSources());
  ipcRenderer.send(actions.LOAD_ONLINE_SOURCES);
}

const requestCreateOnlineSource = (dictionary: Object) => ({
  type: actions.REQUEST_UPSERT_ONLINE_SOURCE,
  dictionary
})

export const createOnlineSource = (dictionary: Object) => (dispatch: Function) => {
  dispatch(requestCreateOnlineSource(dictionary));
  ipcRenderer.send(actions.UPSERT_ONLINE_SOURCE, dictionary);
}

const requestEditOnlineSource = (dictionary: Object) => ({
  type: actions.REQUEST_EDIT_ONLINE_SOURCE,
  dictionary
})

export const editOnlineSource = (dictionary: Object) => (dispatch: Function) => {
  dispatch(requestEditOnlineSource(dictionary));
  ipcRenderer.send(actions.EDIT_ONLINE_SOURCE, dictionary);
}

const requestDeleteOnlineSource = (dictionaryId: number) => ({
  type: actions.REQUEST_DELETE_ONLINE_SOURCE,
  dictionaryId
})

export const deleteOnlineSource = (dictionaryId: number) => (dispatch: Function) => {
  dispatch(requestDeleteOnlineSource(dictionaryId));
  ipcRenderer.send(actions.DELETE_ONLINE_SOURCE, dictionaryId);
}
