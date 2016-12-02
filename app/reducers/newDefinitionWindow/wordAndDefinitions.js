// @flow
import * as actions from '../../actions/constants/newDefinitionWindow';

const initialState = {
  currentWord: '',
  definitions: {}
};

export function wordAndDefinitions(state: Object = initialState, action: Object) {
  switch (action.type) {
    case actions.CHANGE_CURRENT_WORD:
      return {...state, currentWord: action.word }
    case actions.DEFINITION_SAVED: //action.data: definitions, array
    case actions.FOUND_DEFINITIONS_OF_WORD:
      const definitions = {};
      action.data.forEach(definition => {
        definitions[definition.id] = definition;
      });
      return {...state, definitions }
    case actions.DEFINITION_DELETED: //action.data: definitionId
      const newState = Object.assign({}, state);
      newState.definitions = Object.assign({}, state.definitions);
      delete newState.definitions[action.data];
      return newState;
    default:
      return state;
  }
}

export function isFetching(state: boolean = false, action: Object) {
  switch (action.type) {
    case actions.REQUEST_SAVE_DEFINITION:
    case actions.REQUEST_FIND_DEFINITIONS_OF_WORD:
    case actions.REQUEST_DELETE_DEFINITION:
      return true;
    case actions.DEFINITION_SAVED:
    case actions.FOUND_DEFINITIONS_OF_WORD:
    case actions.DEFINITION_DELETED:
      return false;
    default:
      return state;
  }
}