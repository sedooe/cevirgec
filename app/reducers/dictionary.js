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

export default function dictionary(state: Object = dictionaries, action: Object) {
  switch (action.type) {
    case actions.CREATE_DICTIONARY: {
      const id = (Object.keys(state).length + 1).toString();
      action.dictionary.id = id;
      return Object.assign({}, state, {
        [id]: action.dictionary
      });
    }
    case actions.EDIT_DICTIONARY: {
      const id = action.dictionary.id;
      return Object.assign({}, state, {
        [id]: action.dictionary
      });
    }
    case actions.CHANGE_ACTIVENESS_OF_DICTIONARY: {
      const id = action.dictionaryId;
      return {...state, [id]: {...state[id], active: !state[id].active}};
    }
    case actions.DELETE_DICTIONARY: {
      const newState = Object.assign({}, state);
      delete newState[action.dictionaryId];
      return newState;
    }
    default:
      return state;
  }
}
