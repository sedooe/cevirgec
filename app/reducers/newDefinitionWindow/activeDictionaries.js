// @flow
import * as actions from '../../actions/constants/dictionary';

export default function activeDictionaries(state: Array<String> = [], action: Object) {
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