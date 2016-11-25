// @flow
import * as actions from '../../actions/constants/dictionary';

export function dictionaries(state: Object = {}, action: Object) {
  switch (action.type) {
    case actions.DICTIONARIES_AND_ACTIVE_DICTIONARIES_LOADED: {
      const dictionaries = {};
      action.dictionaries.forEach(dictionary => {
        dictionaries[dictionary.id] = dictionary;
      });
      return dictionaries;
    }
    default:
      return state;
  }
}

export function isFetching(state: boolean = false, action: Object) {
  switch (action.type) {
    case actions.REQUEST_LOAD_DICTIONARIES:
      return true;
    case actions.DICTIONARIES_LOADED:
      return false;
    default:
      return state;
  }
}

export function activeDictionaries(state: Array<String> = [], action: Object) {
  switch (action.type) {
    case actions.DICTIONARIES_AND_ACTIVE_DICTIONARIES_LOADED:
      return action.activeDictionaryIds;
    case actions.ACTIVE_DICTIONARIES_SELECT_ALL:
      return Object.keys(action.dictionaries);
    case actions.ACTIVE_DICTIONARIES_CLEAR_ALL:
      return [];
    case actions.CHANGE_ACTIVE_DICTIONARIES:
      return action.dictionaryIds;
    default:
      return state;
  }
}