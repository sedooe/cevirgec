// @flow
import * as actions from '../../actions/constants/newDefinitionWindow';

export default function wordAndDefinitions(state: Object = {}, action: Object) {
  switch (action.type) {
    case actions.CHANGE_CURRENT_WORD:
      return {...state, currentWord: action.word }
    case actions.DEFINITION_SAVED: //action.data: definitions, array
      const definitions = {};
      action.data.forEach(definition => {
        definitions[definition.id] = definition;
      });
      return {...state, definitions: definitions }
    default:
      return state;
  }
}
