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
    case CREATE_DICTIONARY:
    case EDIT_DICTIONARY:
      let id = action.data.id;
      return Object.assign({}, state, {
        id: action.data
      })
    case DELETE_DICTIONARY:
      let newState = Object.assign({}, state);
      delete newState[action.data];
      return newState;
    default:
      return state;
  }
}
