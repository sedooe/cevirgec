// @flow
import * as actions from '../actions/constants';

let dictionaries = {
  "1": {
    id: "1",
    name: "deneme",
    sourceLanguage: "af",
    targetLanguage: "tr",
    context: "sport",
    numberOfDefinitions: "9",
    active: true
  },
  "2": {
    id: "2",
    name: "sozluk",
    sourceLanguage: "za",
    targetLanguage: "tr",
    context: "technology",
    numberOfDefinitions: "90",
    active: false
  }
};

export default function dictionary(state: Object = {isFetching: false, dictionaries: dictionaries}, action: Object) {
  switch (action.type) {
    case actions.REQUEST_CREATE_DICTIONARY: {
      const id = (Object.keys(state.dictionaries).length + 1).toString();
      action.dictionary.id = id;
      return {...state, dictionaries: {...state.dictionaries, [id]: action.dictionary}}
      //return {...state, isFetching: true}
    }
    case actions.DICTIONARY_CREATED: {
      const id = (Object.keys(state.dictionaries).length + 1).toString();
      action.dictionary.id = id;
      return {...state, dictionaries: {...state.dictionaries, [id]: action.dictionary}}
    }
    case actions.EDIT_DICTIONARY: {
      const id = action.dictionary.id;
      return {...state, dictionaries: {...state.dictionaries, [id]: action.dictionary}}
    }
    case actions.CHANGE_ACTIVENESS_OF_DICTIONARY: {
      const id = action.dictionaryId;
      return {...state, dictionaries: {...state.dictionaries, [id]: {...state.dictionaries[id], active: !state.dictionaries[id].active}}}
    }
    case actions.DELETE_DICTIONARY: {
      const newState = Object.assign({}, state.dictionaries);
      delete newState[action.dictionaryId];
      return Object.assign({}, {dictionaries: newState}, {isFetching: state.isFetching});
    }
    default:
      return state;
  }
}
