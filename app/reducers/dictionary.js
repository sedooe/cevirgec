// @flow
import { CREATE_DICTIONARY, EDIT_DICTIONARY, DELETE_DICTIONARY } from '../actions/dictionary';

let dictionaries = {
  1: {
    id: 1,
    name: "deneme",
    sourceLanguage: "af",
    targetLanguage: "tr",
    context: "sport",
    numberOfDefinitions: "9",
    active: true
  },
  2: {
    id: 2,
    name: "sozluk",
    sourceLanguage: "za",
    targetLanguage: "tr",
    context: "technology",
    numberOfDefinitions: "90",
    active: false
  }
};

export default function dictionary(state: Object = dictionaries, action: Object) {
  switch (action.type) {
    case CREATE_DICTIONARY: {
      let mergedOne = {};
      mergedOne[Object.keys(state).length + 1] = action.dictionary;
      return Object.assign({}, state, mergedOne);
    }
    case EDIT_DICTIONARY: {
      let mergedOne = {};
      mergedOne[action.dictionary.id] = action.dictionary;
      return Object.assign({}, state, mergedOne);
    }
    case DELETE_DICTIONARY:
      let newState = Object.assign({}, state);
      delete newState[action.dictionaryId];
      return newState;
    default:
      return state;
  }
}
