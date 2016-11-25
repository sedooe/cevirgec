// @flow
import * as actions from './constants/dictionary';
const { ipcRenderer } = require('electron');

const requestLoadDictionaries = () => ({
  type: actions.REQUEST_LOAD_DICTIONARIES
})

export const loadDictionaries = () => (dispatch: Function) => {
  dispatch(requestLoadDictionaries());
  ipcRenderer.send(actions.LOAD_DICTIONARIES);
}

const requestCreateDictionary = (dictionary: Object) => ({
  type: actions.REQUEST_CREATE_DICTIONARY,
  dictionary
})

export const createDictionary = (dictionary: Object) => (dispatch: Function) => {
  dispatch(requestCreateDictionary(dictionary));
  ipcRenderer.send(actions.CREATE_DICTIONARY, dictionary);
}

const requestEditDictionary = (dictionary: Object) => ({
  type: actions.REQUEST_EDIT_DICTIONARY,
  dictionary
})

export const editDictionary = (dictionary: Object) => (dispatch: Function) => {
  dispatch(requestEditDictionary(dictionary));
  ipcRenderer.send(actions.EDIT_DICTIONARY, dictionary);
}

const requestDeleteDictionary = (dictionaryId: number) => ({
  type: actions.REQUEST_DELETE_DICTIONARY,
  dictionaryId
})

export const deleteDictionary = (dictionaryId: number) => (dispatch: Function) => {
  dispatch(requestDeleteDictionary(dictionaryId));
  ipcRenderer.send(actions.DELETE_DICTIONARY, dictionaryId);
}

const requestchangeActivenessOfDictionary = (dictionaryId: number) => ({
  type: actions.REQUEST_CHANGE_ACTIVENESS_OF_DICTIONARY,
  dictionaryId
})

export const changeActivenessOfDictionary = (dictionaryId: number) => (dispatch: Function) => {
  dispatch(requestchangeActivenessOfDictionary(dictionaryId));
  ipcRenderer.send(actions.CHANGE_ACTIVENESS_OF_DICTIONARY, dictionaryId);
}

export const dictionariesAndActiveDictionariesLoaded = (dictionaries: Array<Object>, activeDictionaryIds: Array<String>) => ({
  type: actions.DICTIONARIES_AND_ACTIVE_DICTIONARIES_LOADED,
  dictionaries,
  activeDictionaryIds
})

export const activeDictionariesSelectAll = (dictionaries: Array<Object>) => ({
  type: actions.ACTIVE_DICTIONARIES_SELECT_ALL,
  dictionaries
})

export const activeDictionariesClearAll = () => ({
  type: actions.ACTIVE_DICTIONARIES_CLEAR_ALL
})

export const changeActiveDictionaries = (dictionaryIds: Array<String>) => ({
  type: actions.CHANGE_ACTIVE_DICTIONARIES,
  dictionaryIds
})