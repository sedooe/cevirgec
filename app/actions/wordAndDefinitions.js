// @flow
import * as actions from './constants/newDefinitionWindow';

export const changeCurrentWord = (word: String) => (dispatch: Function) => {
  dispatch({ type: actions.CHANGE_CURRENT_WORD, word });
}