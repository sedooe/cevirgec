// @flow
import * as actions from '../../actions/constants/newDefinitionWindow';
import {
  REQUEST_CHANGE_ACTIVENESS_OF_DICTIONARY,
  DICTIONARIES_ACTIVENESS_CHANGED,
  ACTIVE_DICTIONARIES_CLEAR_ALL } from '../../actions/constants/dictionary';

const getParameterByName = (name, url) => {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

const initialState = {
  currentWord: getParameterByName('currentWord', window.location.search),
  definitions: {},
  freshDefinitions: {}
};

export function wordAndDefinitions(state: Object = initialState, action: Object) {
  switch (action.type) {
    case actions.CHANGE_CURRENT_WORD:
      return {...state, currentWord: action.word }
    case actions.FOUND_DEFINITIONS_OF_WORD: //action.data: definitions, array
      const definitions = {};
      action.data.forEach(definition => {
        definitions[definition.id] = definition;
      });
      return {...state, definitions }
    case actions.DEFINITION_EDITED: //action.data: definition
      return {...state, definitions: {...state.definitions, [action.data.id]: action.data } };
    case actions.DEFINITION_DELETED: //action.data: definitionId
      const newState = Object.assign({}, state);
      newState.definitions = Object.assign({}, state.definitions);
      delete newState.definitions[action.data];
      return newState;
    case ACTIVE_DICTIONARIES_CLEAR_ALL:
      return {...state, definitions: {} };
    case actions.MERGE_DEFINITIONS_RESULT:
      const freshDefinitions = {};
      const newDefinitionsObject = {};
      action.definitions.forEach(definition => {
        newDefinitionsObject[definition.id] = definition;
        freshDefinitions[definition.id] = true;
      });
      //intentionally not used combineReducers
      return {
        ...state,
        definitions: {...state.definitions, ...newDefinitionsObject },
        freshDefinitions: {...state.freshDefinitions, ...freshDefinitions }
      };      
    default:
      return state;
  }
}

export function isFetching(state: boolean = false, action: Object) {
  switch (action.type) {
    case actions.REQUEST_SAVE_DEFINITION:
    case actions.REQUEST_FIND_DEFINITIONS_OF_WORD:
    case actions.REQUEST_DELETE_DEFINITION:
    case actions.REQUEST_EDIT_DEFINITION:
    case REQUEST_CHANGE_ACTIVENESS_OF_DICTIONARY:
      return true;
    case actions.DEFINITION_SAVED:
    case actions.FOUND_DEFINITIONS_OF_WORD:
    case actions.DEFINITION_DELETED:
    case actions.DEFINITION_EDITED:
    case DICTIONARIES_ACTIVENESS_CHANGED:
      return false;
    default:
      return state;
  }
}