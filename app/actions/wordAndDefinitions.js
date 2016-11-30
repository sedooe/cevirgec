// @flow
import * as actions from './constants/newDefinitionWindow';
const { ipcRenderer } = require('electron');

export const changeCurrentWord = (word: String) => (dispatch: Function) => {
  dispatch({ type: actions.CHANGE_CURRENT_WORD, word });
  // TODO: search word and find its definitions.
}

const requestSaveDefinition = () => ({
  type: actions.REQUEST_SAVE_DEFINITION
})

export const saveDefinition = (definition: Object, activeDictionaryIds: Array<String>) => (dispatch: Function) => {
  dispatch(requestSaveDefinition());
  ipcRenderer.send(actions.SAVE_DEFINITION, definition, activeDictionaryIds);
}