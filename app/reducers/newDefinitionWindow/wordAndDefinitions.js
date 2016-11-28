// @flow
import * as actions from '../../actions/constants/newDefinitionWindow';

export default function wordAndDefinitions(state: Object = {}, action: Object) {
  switch (action.type) {
    case actions.CHANGE_CURRENT_WORD:
      return {...state, currentWord: action.word }
    default:
      return state;
  }
}