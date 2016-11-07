// @flow
import * as actions from '../actions/constants';

const initialDictionaries = {
  '1': {
    id: '1',
    name: 'deneme',
    sourceLanguage: 'af',
    targetLanguage: 'tr',
    context: 'sport',
    numberOfDefinitions: '9',
    active: true
  },
  '2': {
    id: '2',
    name: 'sozluk',
    sourceLanguage: 'za',
    targetLanguage: 'tr',
    context: 'technology',
    numberOfDefinitions: '90',
    active: false
  }
}

export function dictionaries(state: Object = initialDictionaries, action: Object) {
  switch (action.type) {
    case actions.DICTIONARY_CREATED: {
      const id = (Object.keys(state).length + 1).toString();
      action.dictionary.id = id;
      return {...state, [id]: action.dictionary };
    }
    case actions.EDIT_DICTIONARY: {
      const id = action.dictionary.id;
      return {...state, [id]: action.dictionary };
    }
    case actions.CHANGE_ACTIVENESS_OF_DICTIONARY: {
      const id = action.dictionaryId;
      return {...state, [id]: {...state[id], active: !state[id].active }};
    }
    case actions.DELETE_DICTIONARY: {
      const newState = Object.assign({}, state);
      delete newState[action.dictionaryId];
      return Object.assign({}, newState);
    }
    default:
      return state;
  }
}

export function isFetching(state: boolean = false, action: Object) {
  switch (action.type) {
    case actions.REQUEST_CREATE_DICTIONARY:
      return true;
    case actions.DICTIONARY_CREATED:
      return false;
    default:
      return state;
  }
}
