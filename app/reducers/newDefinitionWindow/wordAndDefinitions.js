// @flow
import * as actions from '../../actions/constants/newDefinitionWindow';

const initialState = {
  currentWord: '',
  definitions: {}
};

export default function wordAndDefinitions(state: Object = initialState, action: Object) {
  switch (action.type) {
    case actions.CHANGE_CURRENT_WORD:
      return {...state, currentWord: action.word }
    case actions.DEFINITION_SAVED: //action.data: definitions, array
      const definitions = {};
      action.data.forEach(definition => {
        definitions[definition.id] = definition;
      });
      return {...state, definitions }
    default:
      return state;
  }
}
