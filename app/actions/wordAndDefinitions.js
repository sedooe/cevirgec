// @flow
import { ipcRenderer } from 'electron';
import * as actions from './constants/newDefinitionWindow';

const requestFindDefinitionsOfWord = () => ({
  type: actions.REQUEST_FIND_DEFINITIONS_OF_WORD
})

export const lookForDefinitions = (word: String, activeDictionaryIds: Array<String>) => (dispatch: Function) => {
  dispatch(requestFindDefinitionsOfWord());
  ipcRenderer.send(actions.FIND_DEFINITIONS_OF_WORD, word, activeDictionaryIds);
}

export const lookForDefinitionsOnWindowOpen = (activeDictionaryIds: Array<String>) => (dispatch: Function, getState: Function) => {
  const word = getState().wordAndDefinitions.wordAndDefinitions.currentWord;
  dispatch(lookForDefinitions(word, activeDictionaryIds));
}

export const lookForDefinitionsWhenNewDefinitionCreated = () => (dispatch: Function, getState: Function) => {
  const word = getState().wordAndDefinitions.wordAndDefinitions.currentWord;
  const activeDictionaryIds = getState().dictionary.activeDictionaries;
  dispatch(lookForDefinitions(word, activeDictionaryIds));
}

export const changeCurrentWordAndLookForDefinitions = (word: String, activeDictionaryIds: Array<String>) => (dispatch: Function) => {
  dispatch({ type: actions.CHANGE_CURRENT_WORD, word });
  dispatch(lookForDefinitions(word, activeDictionaryIds));
}

const requestSaveDefinition = () => ({
  type: actions.REQUEST_SAVE_DEFINITION
})

export const saveDefinition = (definition: Object, activeDictionaryIds: Array<String>) => (dispatch: Function) => {
  dispatch(requestSaveDefinition());
  ipcRenderer.send(actions.SAVE_DEFINITION, definition, activeDictionaryIds);
}

const requestDeleteDefinition = () => ({
  type: actions.REQUEST_DELETE_DEFINITION
})

export const deleteDefinition = (definitionId: number) => (dispatch: Function) => {
  dispatch(requestDeleteDefinition());
  ipcRenderer.send(actions.DELETE_DEFINITION, definitionId);
}

const requestEditDefinition = () => ({
  type: actions.REQUEST_EDIT_DEFINITION
})

export const editDefinition = (definition: Object) => (dispatch: Function) => {
  dispatch(requestEditDefinition());
  ipcRenderer.send(actions.EDIT_DEFINITION, definition);
}

export const mergeDefinitions = (definitions: Array<Object>) => (dispatch: Function) => {
  dispatch({ type: actions.MERGE_DEFINITIONS_RESULT, definitions });
}

export const hideDefinitionSaveMessage = () => ({
  type: actions.HIDE_DEFINITION_SAVE_MESSAGE
})
