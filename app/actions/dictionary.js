// @flow
import { ipcRenderer } from 'electron';
import * as actions from './constants/dictionary';
import { lookForDefinitions } from './wordAndDefinitions';
import { loadOnlineSourcesOfActiveDictionaries } from './onlineSource';

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

const requestchangeActivenessOfDictionary = () => ({
  type: actions.REQUEST_CHANGE_ACTIVENESS_OF_DICTIONARY
})

export const changeActivenessOfDictionary = (dictionaryId: number) => (dispatch: Function) => {
  dispatch(requestchangeActivenessOfDictionary());
  ipcRenderer.send(actions.CHANGE_ACTIVENESS_OF_DICTIONARY, dictionaryId);
}

export const dictionariesAndActiveDictionariesLoaded = (dictionaries: Array<Object>, activeDictionaryIds: Array<String>) => 
  (dispatch: Function) => {
    const dictionariesObject = {};
    const activeDictionaries = {};
    dictionaries.forEach(dictionary => {
      dictionariesObject[dictionary.id] = dictionary;
      if (activeDictionaryIds.indexOf(dictionary.id.toString()) > -1) {
        activeDictionaries[dictionary.id] = dictionary;
      }
    });

    dispatch(loadOnlineSourcesOfActiveDictionaries(activeDictionaries));
    dispatch({
      type: actions.DICTIONARIES_AND_ACTIVE_DICTIONARIES_LOADED,
      dictionariesObject,
      activeDictionaryIds
    });
}

const changeActivenessOfDictionaries = (dictionaryIds: Array<String>) => (dispatch: Function) => {
  dispatch(requestchangeActivenessOfDictionary());
  ipcRenderer.send(actions.CHANGE_ACTIVENESS_OF_DICTIONARIES, dictionaryIds);
}

export const activeDictionariesSelectAll = (dictionaries: Object, word: String) => (dispatch: Function) => {
  dispatch(loadOnlineSourcesOfActiveDictionaries(dictionaries));
  dispatch({
    type: actions.ACTIVE_DICTIONARIES_SELECT_ALL,
    dictionaries
  });

  const dictionaryIds = Object.keys(dictionaries).map(key => key.toString());
  dispatch(changeActivenessOfDictionaries(dictionaryIds));
  dispatch(lookForDefinitions(word, dictionaryIds));
}

export const activeDictionariesClearAll = () => (dispatch: Function) => {
  dispatch(loadOnlineSourcesOfActiveDictionaries({}));
  dispatch(changeActivenessOfDictionaries([]));
  dispatch({ type: actions.ACTIVE_DICTIONARIES_CLEAR_ALL });
}

export const changeActiveDictionaries = (dictionaryIds: Array<String>, dictionaries: Object, word: String) => (dispatch: Function) => {
  const activeDictionaries = {};
  dictionaryIds.forEach(id => activeDictionaries[id] = dictionaries[id]);
  dispatch(loadOnlineSourcesOfActiveDictionaries(activeDictionaries));
  dispatch(changeActivenessOfDictionaries(dictionaryIds));
  dispatch({
    type: actions.CHANGE_ACTIVE_DICTIONARIES,
    dictionaryIds
  });
  dispatch(lookForDefinitions(word, dictionaryIds));
}

const requestLoadDefinitionsByDictionaryId = () => ({
  type: actions.REQUEST_LOAD_DEFINITIONS_BY_DICTIONARY_ID
})

export const loadDefinitionsByDictionaryId = (dictionaryId: number) => (dispatch: Function) => {
  dispatch(requestLoadDefinitionsByDictionaryId());
  ipcRenderer.send(actions.LOAD_DEFINITIONS_BY_DICTIONARY_ID, dictionaryId);
}