// @flow
import * as actions from '../actions/constants/dictionary';

export function dictionaries(state: Object = {}, action: Object) {
  switch (action.type) {
    case actions.DICTIONARIES_LOADED: { //action.data: dictionaries
      const dictionaries = {};
      action.data.forEach(dictionary => {
        dictionaries[dictionary.id] = dictionary;
      });
      return dictionaries;
    }
    case actions.DICTIONARY_CREATED:
    case actions.DICTIONARY_EDITED: { //action.data: dictionary
      const id = action.data.id;
      return {...state, [id]: action.data };
    }
    case actions.DICTIONARY_ACTIVENESS_CHANGED: { //action.data: dictionaryId
      const id = action.data;
      return {...state, [id]: {...state[id], active: !state[id].active }};
    }
    case actions.DICTIONARY_DELETED: { //action.data: dictionaryId
      const newState = Object.assign({}, state);
      delete newState[action.data];
      return Object.assign({}, newState);
    }
    case actions.DICTIONARIES_AND_ACTIVE_DICTIONARIES_LOADED:
      return action.dictionariesObject;
    case actions.DEFINITIONS_BY_DICTIONARY_ID_LOADED: //action.data: definitions array
      const dictionaryId = action.data[0].dictionaryId;
      return {...state, [dictionaryId]: {...state[dictionaryId], definitions: action.data } };
    default:
      return state;
  }
}

export function isFetching(state: boolean = false, action: Object) {
  switch (action.type) {
    case actions.REQUEST_CREATE_DICTIONARY:
    case actions.REQUEST_DELETE_DICTIONARY:
    case actions.REQUEST_EDIT_DICTIONARY:
    case actions.REQUEST_CHANGE_ACTIVENESS_OF_DICTIONARY:
    case actions.REQUEST_LOAD_DICTIONARIES:
    case actions.REQUEST_LOAD_ONLINE_SOURCES_OF_ACTIVE_DICTIONARIES:
    case actions.REQUEST_LOAD_DEFINITIONS_BY_DICTIONARY_ID:
      return true;
    case actions.DICTIONARY_CREATED:
    case actions.DICTIONARY_DELETED:
    case actions.DICTIONARY_EDITED:
    case actions.DICTIONARY_ACTIVENESS_CHANGED:
    case actions.DICTIONARIES_LOADED:
    case actions.DICTIONARIES_AND_ACTIVE_DICTIONARIES_LOADED:
    case actions.DEFINITIONS_BY_DICTIONARY_ID_LOADED:
      return false;
    default:
      return state;
  }
}