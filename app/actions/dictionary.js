// @flow
import * as actions from './constants';
const ipc = require('electron').ipcRenderer;

const requestCreateDictionary = (dictionary: Object) => ({
  type: actions.REQUEST_CREATE_DICTIONARY,
  dictionary
})

export const createDictionary = (dictionary: Object) => (dispatch: Function) => {
  dispatch(requestCreateDictionary(dictionary));
  ipc.send(actions.CREATE_DICTIONARY, dictionary);
}

export const editDictionary = (dictionary: Object) => ({
  type: actions.EDIT_DICTIONARY,
  dictionary
})

export const deleteDictionary = (dictionaryId: number) => ({
  type: actions.DELETE_DICTIONARY,
  dictionaryId
})

export const changeActivenessOfDictionary = (dictionaryId: number) => ({
  type: actions.CHANGE_ACTIVENESS_OF_DICTIONARY,
  dictionaryId
})

// export function incrementAsync(delay: number = 1000) {
//   return (dispatch: Function) => {
//     setTimeout(() => {
//       dispatch(increment());
//     }, delay);
//   };
// }
