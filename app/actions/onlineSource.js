// @flow
import { ipcRenderer } from 'electron';
import * as actions from './constants/onlineSource';

const requestLoadOnlineSources = () => ({
  type: actions.REQUEST_LOAD_ONLINE_SOURCES
})

export const loadOnlineSources = () => (dispatch: Function) => {
  dispatch(requestLoadOnlineSources());
  ipcRenderer.send(actions.LOAD_ONLINE_SOURCES);
}

const requestCreateOnlineSource = (onlineSource: Object) => ({
  type: actions.REQUEST_UPSERT_ONLINE_SOURCE,
  onlineSource
})

export const createOnlineSource = (onlineSource: Object) => (dispatch: Function) => {
  dispatch(requestCreateOnlineSource(onlineSource));
  ipcRenderer.send(actions.UPSERT_ONLINE_SOURCE, onlineSource);
}

const requestEditOnlineSource = (onlineSource: Object) => ({
  type: actions.REQUEST_UPSERT_ONLINE_SOURCE,
  onlineSource
})

export const editOnlineSource = (onlineSource: Object) => (dispatch: Function) => {
  dispatch(requestEditOnlineSource(onlineSource));
  ipcRenderer.send(actions.UPSERT_ONLINE_SOURCE, onlineSource);
}

const requestDeleteOnlineSource = (onlineSourceId: number) => ({
  type: actions.REQUEST_DELETE_ONLINE_SOURCE,
  onlineSourceId
})

export const deleteOnlineSource = (onlineSourceId: number) => (dispatch: Function) => {
  dispatch(requestDeleteOnlineSource(onlineSourceId));
  ipcRenderer.send(actions.DELETE_ONLINE_SOURCE, onlineSourceId);
}

const requestLoadOnlineSourcesOfActiveDictionaries = () => ({
  type: actions.REQUEST_LOAD_ONLINE_SOURCES_OF_ACTIVE_DICTIONARIES
})

export const loadOnlineSourcesOfActiveDictionaries = (dictionaries: Object) => (dispatch: Function) => {
  dispatch(requestLoadOnlineSourcesOfActiveDictionaries());

  const sourceLanguages = new Set();
  Object.keys(dictionaries).forEach(key => {
    sourceLanguages.add(dictionaries[key].sourceLanguage);
  })

  ipcRenderer.send(actions.LOAD_ONLINE_SOURCES_OF_ACTIVE_DICTIONARIES, Array.from(sourceLanguages));
}

export const loadOnlineSourcesOfDictionary = (dictionary: Object) => (dispatch: Function) => {
  dispatch(requestLoadOnlineSourcesOfActiveDictionaries());
  ipcRenderer.send(actions.LOAD_ONLINE_SOURCES_OF_ACTIVE_DICTIONARIES, dictionary.sourceLanguage);
}